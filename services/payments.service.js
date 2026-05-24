import { db } from "../config/db.js";

export default class PaymentsService{
    constructor(){}

    create_Payment = async (data) => {
    
    const { customer_id, company_id,  amount, applications } = data;
    
    const conn = await db.getConnection();

    try {
        await conn.beginTransaction();

        // Buscar Factura a pagar
        const [invoiceExist] = await conn.query(
            `Select count(*) as cantidad from invoices            
            WHERE id = ? and customer_id = ? and company_id = ?`,
            [applications[0].invoice_id, customer_id, company_id]
        );
        
        if(invoiceExist[0].cantidad<=0){
            return { "Invoice":{},"message": "No existe factura para pagar" };  
        }

        const [paymentRes] = await conn.query(
        `INSERT INTO payments (customer_id, company_id, amount, payment_date)
        VALUES (?, ?, ?, CURDATE())`,
        [customer_id, company_id, amount]
        );

        const paymentId = paymentRes.insertId;

        for (const app of applications) {
        // guardar detalle
        await conn.query(
            `INSERT INTO payment_details (payment_id, invoice_id, amount_applied)
            VALUES (?, ?, ?)`,
            [paymentId, app.invoice_id, app.amount_applied]
        );

        // actualizar balance
        await conn.query(
            `UPDATE invoices
            SET balance = balance - ?
            WHERE id = ? and customer_id = ? and company_id = ?`,
            [app.amount_applied, app.invoice_id, customer_id, company_id]
        );

        // actualizar estado
        await conn.query(
            `UPDATE invoices
            SET status =
            CASE
                WHEN balance <= 0 THEN 'PAID'
                WHEN balance < total THEN 'PARTIAL'
                ELSE 'PENDING'
            END
            WHERE id = ? and customer_id = ? and company_id = ?`,
            [app.invoice_id, customer_id, company_id]
        );
        }

        await conn.commit();
        return {"Idgenerado":paymentId, "message": "Ok" };        
    } catch (err) {
        console.log(err)
        await conn.rollback();  
        return { "Invoice":{},"message": "Problemas al registrar server" };  
    } finally {        
        conn.release();
    }
    };




    calculateTotal = (items) => {
            return items.reduce(
                (sum, i) => sum + i.amount_applied,
                0
            );
    };


    validatePayment = (data) => {
        let errors = [];

        if (!data.customer_id) errors.push("customer_id requerido");
        
        if (!data.company_id) errors.push("company_id requerido");

        if (!data.amount || data.amount <= 0)
            errors.push("amount debe ser mayor a 0");

        
        if (data.amount && data.amount !== this.calculateTotal(data.applications)) {
            errors.push("El total no coincide con los items");
        }
                
        if (!Array.isArray(data.applications) || data.applications.length === 0) {
            errors.push("applications debe tener al menos un elemento");
        } else {
            data.applications.forEach((a, i) => {
            if (!a.invoice_id)
                errors.push(`applications[${i}].invoice_id requerido`);
            if (!a.amount_applied || a.amount_applied <= 0)
                errors.push(`applications[${i}].amount_applied inválido`);
            });
        }

        return errors;
    };

}