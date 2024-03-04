'use strict'

import Empresa from './empresa.model.js'
import ExcelJS from 'exceljs'

//TEST
export const test = (req, res) => {
    console.log('test is running')
    return res.send({ message: 'Test is running' })
}

//REGISTER
export const register = async (req, res) => {
    try {
        let data = req.body
        let empresa = new Empresa(data)
        await empresa.save()
        return res.send({ message: `Company created succesfully ${empresa.nameEmpresa}` })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'The company could not be added' })
    }
}

//UPDATE
export const update = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let updatedEmpresa = await Empresa.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if (!updatedEmpresa) return res.status(404).send({ message: 'Company not updated' })
        return res.send({ message: `Company ${updatedEmpresa.nameEmpresa}  updated` })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating company' })
    }
}

//GET 
export const get = async (req, res) => {
    try {
        let empresa = await Empresa.find()
        return res.send({ empresa: empresa })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'company not found' })
    }
}

//EXP
export const getExperiences = async (req, res) => {
    try {
        let data = req.body
        let añosEmpresa = await Empresa.find({ añosExperiencia: data.añosExperiencia })
        return res.send({ añosEmpresa})
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Companies not found' })
    }
}

//SEARCH BY CATEGORY
export const getCategory = async (req, res) => {
    try {
        let {search } = req.body
        let empresa = await Empresa.find({ category: search }).populate('category', ['nameCategory'])
        if (!empresa) return res.status(404).send({ message: 'Companies not exist' });
        return res.send({ empresa });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Companies not found' });
    }
}

//FROM A TO Z
export const getAFromZ = async (req, res) => {
    try {
        let sortAToZ = await Empresa.find().sort({ nameEmpresa: +1 })
        return res.send({ sortAToZ: sortAToZ });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Not found companies' });
    }
}

//FROM Z TO A 
export const getZFromA = async (req, res) => {
    try {
        let sortZToA = await Empresa.find().sort({ nameEmpresa: -1 })
        return res.send({ sortZToA: sortZToA })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: ' Not found companies' })
    }
}

//EXCEL REPORT
export const excelReport = async (req, res) => {
    try {
        let empresas = await Empresa.find().populate('category', ['nameCategory', 'description']);
        let book = new ExcelJS.Workbook();
        let worksheet = book.addWorksheet('EMPRESAS');
        worksheet.columns = [
            { header: 'NAME', key: 'nameCompany', width: 20 },
            { header: 'CATEGORY', key: 'nameCategory', width: 20 },
            { header: 'DESCRIPTION', key: 'description', width: 40 }
        ];
        empresas.forEach(empresas => {
            worksheet.addRow({
                nameCompany: empresas.nameEmpresa,
                nameCategory: empresas.category.nameCategory,
                description: empresas.category.description
            });
        });
        let filePath = 'GestorEmpresas.xlsx';
        await book.xlsx.writeFile(filePath);
        res.attachment(filePath);
        res.send();
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error generating Excel', error: error });
    }
}

//DELETE
export const deleteE = async (req, res) => {
    try {
        let { id } = req.params
        let deletedEmpresa = await Empresa.findOneAndDelete({ _id: id })
        if (!deletedEmpresa) return res.status(404).send({ message: 'Empresa not found and not deleted' })
        return res.send({ message: `Empresa with name ${deletedEmpresa.nameEmpresa} deleted successfully` });
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting Empresa' })
    }
}