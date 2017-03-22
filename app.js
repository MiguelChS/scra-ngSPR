/**
 * Created by mc185249 on 3/22/2017.
 */
let downLoadExcel = require('./GetExcel');
let moment = require('moment');
let fs = require("fs");
let config = require('config');

function buscar(){
    console.log("iniciando -->",moment().format("DD-MM-YYYY HH:mm:ss"));
    //chile
    let fechaIni = moment().subtract(1,'days').format("DD-MMM-YYYY");
    let fechaFin = moment().format("DD-MMM-YYYY");
    let fechaIniArch = moment().subtract(1,'days').format("YYYYMMDD");
    let paramCompart = {
        'STATUS':'ALL',
        'TYPE':'ALL',
        'FROMDATE':fechaIni,
        'ENDDATE':fechaFin
    };
    let paramChile = {
        'hidden_run_parameters':'server=rep_sun1350_appserver10g&report=rep232.rdf&desformat=delimiteddata&destype=cache&userid=CHILE%2FCHILE%40cimsprod&AUTH_LVL=1&BRANCH_1=6915&paramform=yes&mimetype=application%2Fvnd.ms-excel',
        'BRANCH':'6915',
    };
    let paramRepublicaDominicana = {
        'hidden_run_parameters':'server=rep_sun1350_appserver10g&report=lcrep232.rdf&desformat=delimiteddata&destype=cache&userid=DOMREP%2FDOMREP%40cimsprod&AUTH_LVL=3&BRANCH_1=6010&paramform=yes&mimetype=application%2Fvnd.ms-excel',
        'BRANCH':'6010',
    };
    let paramColombia = {
        'hidden_run_parameters':'server=rep_sun1350_appserver10g&report=rep232.rdf&desformat=delimiteddata&destype=cache&userid=COLUMBIA%2FCOLUMBIA%40cimsprod&AUTH_LVL=1&BRANCH_1=6005&paramform=yes&mimetype=application%2Fvnd.ms-excel',
        'BRANCH':'6005',
    };
    let paramPeru = {
        'hidden_run_parameters':'server=rep_sun1350_appserver10g&report=rep232.rdf&desformat=delimiteddata&destype=cache&userid=PERU%2FPERU%40cimsprod&AUTH_LVL=1&BRANCH_1=6921&paramform=yes&mimetype=application%2Fvnd.ms-excel',
        'BRANCH':'6921',
    };
    Object.assign(paramChile,paramCompart);
    Object.assign(paramRepublicaDominicana,paramCompart);
    Object.assign(paramColombia,paramCompart);
    Object.assign(paramPeru,paramCompart);

    downLoadExcel(paramChile,config.get('server'))
        .then((result)=>{
            fs.writeFile(`${config.get('rootArchive')}${fechaIniArch}_${config.get('nameArchive.Chile')}`,result,(err)=>{
                    if(err) console.log("error Write Chile -->",err);
            });
        })
        .catch((err)=>{
            console.log("descargar chile --->", err)
        });

    downLoadExcel(paramRepublicaDominicana,config.get('server'))
        .then((result)=>{
            fs.writeFile(`${config.get('rootArchive')}${fechaIniArch}_${config.get('nameArchive.Colombia')}`,result,(err)=>{
                if(err) console.log("error Write RPDomi -->",err)
            });
        })
        .catch((err)=>{
            console.log("descargar RPDomi--->", err)
        });

    downLoadExcel(paramColombia,config.get('server'))
        .then((result)=>{
            fs.writeFile(`${config.get('rootArchive')}${fechaIniArch}_${config.get('nameArchive.Peru')}`,result,(err)=>{
                if(err) console.log("error Write COlombia -->",err)
            });
        })
        .catch((err)=>{
            console.log("descargar COlombia--->", err)
        });

    downLoadExcel(paramPeru,config.get('server'))
        .then((result)=>{
            fs.writeFile(`${config.get('rootArchive')}${fechaIniArch}_${config.get('nameArchive.RepublicaDominicana')}`,result,(err)=>{
                if(err) console.log("error Write PEru -->",err)
            });
        })
        .catch((err)=>{
            console.log("descargar PEru--->", err)
        });
}

buscar();