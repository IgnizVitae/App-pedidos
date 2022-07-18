import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "ReactNativeSQLite.db"; //nome do banco de dados
const database_version = "1.0"; // Versão do banco de dados
const database_displayname = "SQLite React Offline Databse";
const database_size = 200000; //tamanho do banco de dados

export default class tarefasDatabase {
    Conectar() {
        let db;
        return new Promise((resolve) => {
            console.log("Checando a integridade do plugin ...");
            SQLite.echoTest().then(() => {
                console.log("Integridade Ok ...");
                console.log("Abrindo Banco de Dados ...");
                SQLite.openDatabase(database_name, database_version, database_displayname, database_size).then(DB => {
                    db = DB;
                    console.log("Banco de dados Aberto");
                    db.executeSql('SELECT 1 FROM Tarefas01 LIMIT 1').then(() => {
                        console.log("O banco de dados está pronto ... Executando Consulta SQL ...");
                    }).catch((error) => {
                        console.log("Erro Recebido: ", error);
                        console.log("O Banco de dados não está pronto ... Criando Dados");
                        db.transaction((tx) => {
                            tx.executeSql('CREATE TABLE IF NOT EXISTS Tarefas01 (id INTEGER PRIMARY KEY AUTOINCREMENT, nomeTarefa varchar(30), dataInicio varchar(30), dataTermino varchar(30), status varchar(30), foto text(30))');
                        }).then(() => {
                            console.log("Tabela criada com Sucesso");
                        }).catch(error => {
                            console.log(error);
                        });
                    });
                    resolve(db);
                }).catch(error => {
                    console.log(error);
                });
            }).catch(error => {
                console.log("echoTest Falhou - plugin não funcional");
            });
        });
    };

    Desconectar(db) {
        if (db) {
            console.log("Fechando Banco de Dados");
            db.close().then(status => {
                console.log("Banco de dados Desconectado!!");
            }).catch(error => {
                this.errorCB(error);
            });
        } else {
            console.log("A conexão com o banco não está aberta");
        }
    };

    Listar() {
        return new Promise((resolve) => {
            const lista = [];
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    //Query SQL para listar os dados da tabela   
                    tx.executeSql('SELECT * FROM Tarefas01', []).then(([tx, results]) => {
                        console.log("Consulta completa");
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            const { id, nomeTarefa, dataInicio, dataTermino ,status, foto } = row;
                            lista.push({ id, nomeTarefa, dataInicio, dataTermino ,status, foto });
                        }
                        console.log(lista);
                        resolve(lista);
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });

    }


    BuscarPorId(id) {  
        console.log(id);  
        return new Promise((resolve) => {    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {   
                    //Query SQL para buscar as informações do produto     
                    tx.executeSql('SELECT * FROM Tarefas01 WHERE id = ?', [id]).then(([tx,results]) => {          
                      console.log(results);         
                      if(results.rows.length > 0) {            
                          let row = results.rows.item(0);            
                          resolve(row);          
                      }        
                  });      
                }).then((result) => {        
                    this.Desconectar(db);      
                }).catch((err) => {        
                    console.log(err);      
                });    
            }).catch((err) => {      
                console.log(err);    
            });  
        });  
    }


    Inserir(tarefa) {  
        return new Promise((resolve) => {    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {     
                    //Query SQL para inserir um novo produto   
                    tx.executeSql('INSERT INTO Tarefas01 (nomeTarefa, dataInicio, dataTermino, status, foto) VALUES (?, ?, ?, ?, ?)', [tarefa.nomeTarefa, tarefa.dataInicio, tarefa.dataTermino, tarefa.status, tarefa.foto]).then(([tx, results]) => { 
                        resolve(results);        
                    });      
                }).then((result) => {        
                    this.Desconectar(db);      
                }).catch((err) => {        
                    console.log(err);      
                });    
            }).catch((err) => {      
                console.log(err);    
            });  
        });  
    }


    Atualizar(id, tarefa) {  
        return new Promise((resolve) => {    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {
                    //Query SQL para atualizar um dado no banco        
                    tx.executeSql('UPDATE Tarefas01 SET nomeTarefa = ?, dataInicio = ?,dataTermino = ?, status = ?, foto = ? WHERE id = ?', [tarefa.nomeTarefa, tarefa.dataInicio, tarefa.dataTermino, tarefa.status, tarefa.foto, tarefa.id]).then(([tx, results]) => {          
                    resolve(results);        
                });      
            }).then((result) => {        
                  this.Desconectar(db);      
                }).catch((err) => {        
                  console.log(err);      
                });    
            }).catch((err) => {     
                console.log(err);    
            });  
        });  
    }


    Remover(id) {  
        return new Promise((resolve) => {    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {    
                    //Query SQL para deletar um item da base de dados    
                    tx.executeSql('DELETE FROM Tarefas01 WHERE Id = ?', [id]).then(([tx, results]) => {          
                        console.log(results);          
                        resolve(results);        
                    });      
                }).then((result) => {        
                    this.Desconectar(db);      
                }).catch((err) => {        
                    console.log(err);      
                });    
            }).catch((err) => {      
                console.log(err);    
            });  
        });  
    }
    
}
