import { db } from "../config/db.js";

export default class InvoiceService {
  constructor(parameters) {}


   create_Invoice = async (data) => {    
            //const conn = await db.getConnection();
            
              try {
                
                //await conn.beginTransaction();
                const {descripcion, customer_id, company_id, items, discount, percentage, issue_date, due_date } = data;
                
                let total = items.reduce(
                  (sum, i) => sum + i.quantity * i.unit_price,
                  0
                );
               
                let totalDiscount = discount;
                if(percentage=="true"){
                  totalDiscount = ((discount * total) / 100)
                }

                let totalcalc = total - totalDiscount;                
                const [result] = await db.query(
                  `INSERT INTO invoices (descripcion, customer_id, company_id, total, discount, percentage, balance, issue_date, due_date)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                  [descripcion, customer_id, company_id, totalcalc, totalDiscount, percentage, total, issue_date, due_date]
                );
            
                const invoiceId = result.insertId;
             
                for (const item of items) {
                  await db.query(
                    `INSERT INTO invoice_items (invoice_id, description, quantity, unit_price, total)
                     VALUES (?, ?, ?, ?, ?)`,
                    [
                      invoiceId,
                      item.description,
                      item.quantity,
                      item.unit_price,
                      item.quantity * item.unit_price,
                    ]
                  );
                }
             
                if (invoiceId>0) {  
                     //await conn.commit();  
                    return {"Idgenerado":invoiceId, "message": "Ok" };
                }
                              
                return { "Invoice":{},"message": "Problemas al registrar" };                           
                
              } catch (err) {
                 console.log(err);
                //await conn.rollback();
                return { "Invoice":{},"message": "Problemas al registrar" };
              } finally {                
                //conn.release();
              } 
        };

all_Invoice_ByCompany = async (company_id) => {     
  try {
               const sqlString =  
                  `SELECT I.id, C.nombre, I.descripcion, balance, I.discount, I.percentage, issue_date, due_date, I.total, 
                   I.company_id,I.customer_id, status from invoices I
                   INNER JOIN Clientes C on C.id = I.customer_id 
                   where I.company_id = ?`

                const [result] = await db.execute(sqlString,[company_id]);
                                  
                if (result) {                                          
                    return {"invoices":result, "message": "Ok" };
                }
                              
                return { "Invoice":{},"message": "No existe factura alguna" };                           
                
              } catch (err) {
                 console.log(err);                
                return { "Invoice":{},"message": "Problemas al registrar" };
              }
}

all_Invoices = async () => {     
  try {
               
                const [result] = await db.query(
                  `SELECT * FROM invoices`,                  
                );
                                  
                if (result) {                       
                    return {"invoices":result, "message": "Ok" };
                }
                              
                return { "Invoice":{},"message": "No existe factura alguna" };                           
                
              } catch (err) {
                 console.log(err);                
                return { "Invoice":{},"message": "Problemas al registrar" };
              }
}

validateInvoice = (data) => {
  const errors = [];

  // cliente
  if (!data.customer_id) {
    errors.push("customer_id es requerido y debe ser numérico");
  }

  //Company
   if (!data.company_id) {
    errors.push("company_id es requerido");
  }

  // fechas
  if (!data.issue_date) {
    errors.push("issue_date es requerido");
  }

  if (!data.due_date) {
    errors.push("due_date es requerido");
  }

  if (data.issue_date && data.due_date) {
    const issue = new Date(data.issue_date);
    const due = new Date(data.due_date);

    if (due < issue) {
      errors.push("due_date no puede ser menor que issue_date");
    }
  }


  // items
  if (!Array.isArray(data.items) || data.items.length === 0) {
    errors.push("Debe incluir al menos un item");
  } else {
    data.items.forEach((item, index) => {
      if (!item.description || item.description.trim() === "") {
        errors.push(`items[${index}].description requerido`);
      }

      if (!item.quantity || item.quantity <= 0) {
        errors.push(`items[${index}].quantity debe ser mayor a 0`);
      }

      if (!item.unit_price || item.unit_price <= 0) {
        errors.push(`items[${index}].unit_price debe ser mayor a 0`);
      }
    });
  }

  return errors;
};

}