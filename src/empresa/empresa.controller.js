'use strict'

import Empresa from './empresa.model.js'
import ExcelJS from 'exceljs'

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
        return res.send({ añosEmpresa: añosEmpresa })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Companies not found' })
    }
}

//SEARCH BY CATEGORY
export const getCategory = async (req, res) => {
    try {
        let { id } = req.body
        let company = await Empresa.find({ _category: id }).populate('category', ['name'])
        if (!company) return res.status(404).send({ message: 'Companies not exist' });
        return res.send({ company });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Companies not found' });
    }
}

//FROM A TO Z
export const getAFromZ = async (req, res) => {
    try {
        let sortAToZ = await Empresa.find().sort({ nameCompany: +1 })
        return res.send({ sortAToZ: sortAToZ });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Not found companies' });
    }
}

//FROM Z TO A 
export const getZFromA = async (req, res) => {
    try {
        let sortZToA = await Empresa.find().sort({ nameCompany: -1 })
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
                nameCompany: empresas.nameCompany,
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
