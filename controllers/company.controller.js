import { getAllCompany, create_Company, update_Company, delete_Company, getCompany_ByCode, getCompany_ByRnc} from "../services/company.service.js";

export class companyController{
    constructor(parameter){

    }


}

export const getCompanies = async (req, res, next) => {
  try {
    //const respuesta = await getAllCompany();
    const respuesta = await getAllCompany();
    if(Object.keys(respuesta.companies).length===0){
        return res.status(404).json({"Error":"No existe data."})
    }

    res.status(200).json(respuesta.companies);
  } catch (error) {
    next(error);
  }
};

export const createCompany = async (req, res, next) => {
  try {

    const compania = req.body;
        
    const respuesta = await create_Company(compania);
    if(respuesta.message==="Ok"){
        return res.status(200).json({"message":"Registro guardado exitosamente"})
    }

    return res.status(404).json({"message":"Error para guardar datos"})
    
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const updateCompany = async (req, res, next) => {
  try {

    const compania = req.body;
        
    const respuesta = await update_Company(compania);
    if(respuesta.message==="Ok"){
        return res.status(200).json({"message":"Registro actualizado exitosamente"})
    }

    return res.status(404).json({"message":"Error para actualizar datos"})
    
  } catch (error) {
    console.error(error);
    next(error);
  }
};


export const deleteCompany = async (req, res, next) => {
  try {

    const codigo = req.body.codigo;
        
    const respuesta = await delete_Company(codigo);
    if(respuesta.message==="Ok"){
        return res.status(200).json({"message":"Registro borrado exitosamente"})
    }

    return res.status(404).json({"message":"Error para guardar datos"})
    
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getCompanyByCode = async (req, res, next) => {
  try {

    const codigo = req.body.codigo;
        
    const respuesta = await getCompany_ByCode(codigo);
    if(respuesta.message==="Ok"){
        return res.status(200).json(respuesta.company)
    }

    return res.status(404).json(respuesta)
    
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getCompanyByRnc = async (req, res, next) => {
  try {

    const rnc = req.body.rnc;
        
    const respuesta = await getCompany_ByRnc(rnc);
    if(respuesta.message==="Ok"){
        return res.status(200).json(respuesta.company)
    }

    return res.status(404).json(respuesta)
    
  } catch (error) {
    console.error(error);
    next(error);
  }
};

