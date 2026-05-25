
import InvoiceService from '../services/invoices.service.js'

const InvSer = new InvoiceService();

export default class InvoiceController{

    createClient = async (req, res, next) => {
        try {

            const invoice = req.body;
      
            const errors = InvSer.validateInvoice(invoice);
            if (errors.length > 0) {                      
              return res.status(400).json({message: "Campos inválidos",errors,});
            }
            
            const result = await InvSer.create_Invoice(invoice);
            
            if(result.message==="Ok"){
                    return res.status(200).json({"message":"Registro guardado exitosamente"})
            }

            return res.status(500).json({"message":"Error al guardar datos", datos: invoice})
            
        } catch (error) {
            console.error(error);
            next(error);
        }
        };


    allInvoices = async (req, res, next) => {
       try {
            
            const result = await InvSer.all_Invoices();
            
            if(result.message==="Ok"){
              return res.status(200).json(result)
            }

            return res.status(500).json({"message":"Error al guardar datos", datos: invoice})
            
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    allInvoicesByCompany = async (req, res, next) => {
       try {
//router.put('/customer/update', clientControl.updateClient);
            const {companyId} = req.params;
                        
            const result = await InvSer.all_Invoice_ByCompany(companyId);
            
            if(result.message==="Ok"){
              return res.status(200).json(result)
            }

            return res.status(500).json({"message":"Error al guardar datos", datos: invoice})
            
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

}



/*
exports.createInvoice = async (req, res) => {
  const { customer_id, company_id, items, issue_date, due_date } = req.body;

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    let total = items.reduce(
      (sum, i) => sum + i.quantity * i.unit_price,
      0
    );

    const [result] = await conn.query(
      `INSERT INTO invoices (customer_id, company_id, total, balance, issue_date, due_date)
       VALUES (?, ?, ?, ?, ?)`,
      [customer_id, company_id, total, total, issue_date, due_date]
    );

    const invoiceId = result.insertId;

    for (const item of items) {
      await conn.query(
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

    await conn.commit();
    res.json({ invoiceId });
  } catch (err) {
    await conn.rollback();
    res.status(500).json(err);
  } finally {
    conn.release();
  }
};
*/