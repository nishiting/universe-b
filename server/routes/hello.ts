import mysql from 'mysql';

const mysqlConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: 'STni123!',
    database: 'sishun',
    charset: 'UTF8',
};

var pool = mysql.createPool(mysqlConfig);

const query = function(sql, values){
    return new Promise((resolve, reject)=>{
        pool.getConnection(function(err, connection){
            if(err){
                reject(err);
            }else{
                connection.query(sql, values, (err, rows)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(rows);
                    }
                    connection.release();
                })
            }
        })
    })
}

export default defineEventHandler(() => {
    return query('select * from basic_sku_info where product_research_report != "" limit 10;',[]);
    // return 'Hello World!';
});