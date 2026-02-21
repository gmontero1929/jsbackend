import { getAllCompany, Company } from "../services/company.service.js";

export class companyController{
    constructor(parameter){

    }


}

export const getCompanies = async (req, res, next) => {
  try {
    //const respuesta = await getAllCompany();
    const respuesta = await getAllCompany();
    console.log(respuesta);
    if(Object.keys(respuesta.companies).length===0){
        return res.status(404).json({"Error":"No existe data."})
    }

    res.status(200).json(respuesta.companies);
  } catch (error) {
    next(error);
  }
};