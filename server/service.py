import time
from datetime import datetime,timedelta
import os
import threading
import schedule
import json
import sys
from filesUtils import read_file, save_file , criptoPassword
from serverSSE import send_notification , serverSSE
sys.path.append('..') 
sys.path.insert(1, './') # Adicione o diretório pai (project) ao sys.path
from Models.Person import Person
from Models.Product import Product

secondJob = 60

class ServerController(object):
    
    def report_product_minimal_stock(self,produto:Product):
        if float(produto.amount) <= float(produto.minimalStorage):
            send_notification("A fruta " + produto.name + "(Código: " + produto.code + ") Atingiu o estoque mínimo, com apenas " + str(int(produto.amount)) + " unidades restantes. Recomendamos efetuar o reabastecimento do estoque imediatamente.")

    def init_report(self):
        global secondJob
        schedule.every(secondJob).seconds.do(self.notifi_no_stock_change)
        while True:
            schedule.run_pending()
            time.sleep(1)

    def update_time_job(self,seconds):
        global secondJob

    def start_threads(this):
        initSse = threading.Thread(target=serverSSE, args=())
        initSse.start()
        x = threading.Thread(target=this.init_report, args=())
        x.start()

    def register(this,person):
        userName= person.name
        pathName = "users/person_"+ userName + ".json"
        if not os.path.exists(pathName):
            password = criptoPassword(person.senha)
            cargo = person.cargo
            user = Person(userName,password,cargo)
            save_file(pathName,json.dumps(user.__dict__))
            return "Usuario cadastrado com sucesso."
        else:
            return "Usuario ja esta cadastrado."

    def notifi_no_stock_change(self):
        response =  self.show_products_without_stock_period()
        for message in response:
            send_notification(message)

    def login(this, person):
        global userAcess
        userAcess= person.name
        pathName = "users/person_"+ userAcess + ".json"
        if not os.path.exists(pathName):
            return "Usuario não existe."
        else:
            password = criptoPassword(person.senha)
            user = read_file(pathName)
            if user["password"] == password:
                this.start_threads()
                return "sucesso"
            else:
                return "senha incorreta."

## Criação e edição de produtos

    def create_product(this,product):
        pathName = "product/" + product.id + ".json"
        if not os.path.exists(pathName):
            product = Product(product.id,product.name,product.description,product.amount,product.price, product.minimalStorage,[])
            product.add_data_history({"action":"criacao","reason":"Adicionando produto no estoque. quantidade:" + product.amount, "date": datetime.now()})
            save_file(pathName,json.dumps(product.__dict__, default=str))
            return "Produto criado com sucesso"
        else:
            return "Produto ja existe."

    def update_product(this,product):
        pathName = "product/" + product.id + ".json"
        if os.path.exists(pathName):
            productByCode = Product.from_dict(read_file(pathName))
            if float(product.amount) > 0:
                productByCode.amount = float(productByCode.amount) + float(product.amount)
                productByCode.add_data_history({"action":"alteracao","reason":"Adicionando " + product.amount + " " + productByCode.name + " ao estoque. ","date": datetime.now()})
            if float(product.price) != 0 and float(product.price) != float(productByCode.price):
                productByCode.add_data_history({"action":"alteracao","reason":"Alterando o preço do produto de " + productByCode.price + "para " + product.price ,"date": datetime.now()})
                productByCode.price = product.price
            if float(product.minimalStorage) != 0 and float(product.minimalStorage) != float(productByCode.minimalStorage):
                productByCode.minimalStorage = product.minimalStorage
            save_file(pathName,json.dumps(productByCode.__dict__, default=str))
            return "produto atualizado com sucesso"
        else:
            return "Produto não existe."

              

    def remove_product(this,product):
        pathName = "product/" + product.id + ".json"
        if os.path.exists(pathName):
            productByCode = Product.from_dict(read_file(pathName))
            if product.quantity > 0:
                if float(productByCode.amount) - float(product.quantity) >= 0:
                    productByCode.add_data_history({"action":"retirada","reason":"Removendo " + str(product.quantity) + " " + productByCode.name + " do estoque.", "date": datetime.now()})
                    productByCode.amount = float(productByCode.amount) - float(product.quantity)
                    save_file(pathName,json.dumps(productByCode.__dict__,default=str))
                    this.report_product_minimal_stock(productByCode)
                    return "\nRetirada de " + productByCode.name + " realizada com sucesso. Estoque atual : " + str(productByCode.amount) 
                else:
                    return 'Não foi possivel retirar o produto ' + productByCode.name + ' . A quantidade que voce busca retirar e maior que o estoque atual.'
            else:
                return 'A quantidade que deseja retirar é menor que 0, tente novamente com outro valor.'
        else:
            return "Produto não existe."

## ----------

## Relatorios de estoque    
    def get_stock(this):
        stock = []
        produtcsPath = os.listdir('product/')
        for productPath in produtcsPath:
           product =  Product.from_dict(read_file("product/" + productPath))
           stock.append(json.dumps({"produto": product.name,"quantidade":product.amount}))
        return stock

    def show_products_without_stock_period(this,period=3):
        produtcsPath = os.listdir('product/')
        stock = []
        for productPath in produtcsPath:
            product =  Product.from_dict(read_file("product/" + productPath))
            haschange = True
            for changes in product.history:
                isPeriod = (datetime.strptime(changes["date"], '%Y-%m-%d %H:%M:%S.%f') > datetime.now() + timedelta(minutes=-float(period)))
                if changes["action"] == "retirada" and isPeriod:
                        haschange = False
            if haschange:
                message  = "A fruta " + product.name + "(Código: " + product.code + ") não está sendo vendida no momento. A quantidade em estoque atual é de " + str(int(product.amount)) + " .Considere a possibilidade de colocar esta fruta em promoção, se necessário, para estimular as vendas."
                stock.append(message)
        return stock

    def show_input_output_stock(this,period):
        stock = []
        produtcsPath = os.listdir('product/')
        for productPath in produtcsPath:
            product =  Product.from_dict(read_file("product/" + productPath))
            detail= []
            for history in product.history:
                isPeriod = (datetime.strptime(history["date"], '%Y-%m-%d %H:%M:%S.%f') > datetime.now() + timedelta(minutes=-float(period)))
                if isPeriod:
                    detail.append("Ação:" + history["action"] + ".\n Descrição: " + history["reason"] + " . Data: " + history["date"] )
            if detail:
                stock.append("Nome do Produto:" + product.name ) 
                stock = stock +  detail
                stock.append("\n")
        return stock
## ----------