import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { createServer, Model } from 'miragejs'


createServer({
  models: {
    transaction: Model, // primeira tabela, ou entidade que vai salvar no banco de dados do mirage 
  }, // Models é o banco de dados do miragejs 

  seeds(server){
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance WebSite',
          type: 'deposit',
          category: 'Trabalho',
          amount: 6000,
          createdAt: new Date('2021-02-12 09:00:00'),
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 1000,
          createdAt: new Date('2021-02-14 08:00:00'),
        },

      ],
    })
  },

  routes() {
    this.namespace = 'api'

    this.get('transactions', () => {
      return this.schema.all('transaction') // 
    })

    this.post('/transactions', (schema, request) => { // ROTA DE CRIAÇÂO
      const data = JSON.parse(request.requestBody) // Aqui cria uma variável que converte os dados enviados pelo usuário para JSON

      return schema.create('transaction',data) // Schema é o banco de dados => o primeiro parametro é o model que está sendo iserido e segundo os dados enviados pelo usuário e queremos passar para dentro desse model 
    })
  }
})

export const api = axios.create({
  baseURL: 'http://localhost:3000/api', 
})