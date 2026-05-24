import PaymentsService from "../services/payments.service.js";

const paySer = new PaymentsService();

export default class PaymentsController{
  constructor(){}

  createPayment = async (req, res) => {
    
    try{      

      const payment = req.body;
      const errors = paySer.validatePayment(payment);

      if (errors.length > 0) {
        return res.status(400).json({message: "Campos inválidos",errors,});
      }
      
      const result = await paySer.create_Payment(payment);
           
      if(result.message==="Ok"){
        return res.status(200).json({"message":"Registro guardado exitosamente"})
        //return res.status(200).json({"message":"Registro guardado exitosamente",data:payment}) 
      }

      return res.status(500).json({"message":"Error al guardar datos", datos: result})

    } catch (err) {
      console.error(err);      
      return res.status(500).json(err);
    }
    };

}
