import { Component, OnInit, Inject, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Mercadoria } from 'src/app/_model/Mercadoria';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  
  mercadorias: Mercadoria[] = [];
  mercadoria: Mercadoria;
  quantidadepalhaChocolate: number;
  quantidadepalhaNinho: number;
  quantidadepalhaNegresco: number;
  quantidadepalhaMorango: number;
  quantidadePote: number;
  resultado = '';
  endereco: string;
  loja: string;
  noWrapSlides = false;
  totalItens: string;

  modalRef: BsModalRef;
  constructor(private toastr: ToastrService
    ,public router: Router
    ,public modalService: BsModalService
    ,@Inject(DOCUMENT) private document: Document) { }
    
    ngOnInit() {}

    produtos = [
      {id: 0, valor: '12,13', img: '../../assets/img/morango.png', nome: 'Iogurte de Morango', color: 'color:#e95420', quantidade: this.quantidadepalhaChocolate },
      {id: 1, valor: '8,00', img: '../../assets/img/produtoJamava.jpg', nome: 'Iogurte c/ poupa de fruta', color: 'color:#e95420', quantidade: this.quantidadepalhaNinho },
      {id: 2, valor: '20,00', img: '../../assets/img/queijo2.png', nome: 'Queijo Mussarela', color: 'color:#e95420', quantidade: this.quantidadepalhaMorango },
      {id: 3, valor: '4,00', img: '../../assets/img/danone.png', nome: 'Danone', color: 'color:#e95420', quantidade: this.quantidadepalhaNegresco }
    ];
    
    preencherCarrinho(){
      var produtosInseridoQuantidade = this.produtos.filter((prod) => prod.quantidade > 0);
      
      const nomesProdutos = produtosInseridoQuantidade.map((prod) => prod.nome);
      const valoresProdutos = produtosInseridoQuantidade.map((prod) => prod.valor);
      const quantidadesProdutos = produtosInseridoQuantidade.map((prod) => prod.quantidade);
      const totaisProdutos = produtosInseridoQuantidade.map((prod) => prod.quantidade != undefined ? prod.quantidade * parseFloat(prod.valor.replace(',','.')): 0);

      if(produtosInseridoQuantidade.length < 1) {
        this.toastr.warning("Insira a quantidade desejada");
        return false;
      }
      else{
        for (let prod = 0; prod < produtosInseridoQuantidade.length; prod++) {
          const totais = totaisProdutos[prod];
          const valores = valoresProdutos[prod];
          const quantidades = quantidadesProdutos[prod];
          const nomes = nomesProdutos[prod];
          this.toastr.success(`O produto ${nomes} foi adcionado no carrinho`);

          this.mercadoria = { id: this.mercadorias.length, nome: nomes, preco: valores, quantidade: quantidades.toString(), totalProduto: totais.toFixed(2).toString().includes(".")? totais.toString().replace('.',',') : totais.toString()+",00" };

          var item = this.mercadoria;
          this.mercadorias.push(item);
        }
        for(var prod in this.produtos){
          this.produtos[prod].quantidade = null;
        }
        this.totalItens = this.mercadorias.length.toString();
        
      }

    }

    retirarDoCarrinho(mercadoria: any){
      this.mercadorias.splice(mercadoria.id, 1);
      for(var item in this.mercadorias){
        this.mercadorias[item].id = parseInt(item);
      }
      this.calcular();
      this.totalItens = this.mercadorias.length.toString();
    }


    openModal(template: TemplateRef<any>){
      if(this.resultado == '' || this.resultado == undefined || this.resultado == null){
        this.toastr.warning("Não há nenhum item no carrinho");
      }
      else{
        this.obterLocalizacao();
      this.modalRef = this.modalService.show(template);
      }
    }
    
    calcular(): boolean{
      if(this.mercadorias.length < 1) {
        this.toastr.warning("Não há nenhum item no carrinho");
        this.resultado = '';
        return false;
      }

      var totalCarrinho = this.mercadorias.reduce((total, soma) => total + parseFloat(soma.totalProduto.toString().replace(',','.')) , 0);

      if(totalCarrinho.toFixed(2).toString().replace('.',',').includes(',')){
        this.resultado = totalCarrinho.toFixed(2).toString().replace('.',',');  
      }
      else{
        this.resultado = totalCarrinho.toFixed(2).toString()+ ',00';  
      }
      return true;
    }
    
    solicitar(){
      if(this.endereco !== undefined && this.endereco !== null && this.endereco !== ''){
        if(this.resultado == '' || this.resultado == undefined || this.resultado == null) {
          this.toastr.warning("Não há nenhum item no carrinho");
        }
        else{
          const nomesProdutos = this.mercadorias.map((prod) => prod.nome);
          const valoresProdutos = this.mercadorias.map((prod) => prod.preco);
          const quantidadesProdutos = this.mercadorias.map((prod) => prod.quantidade);
          const totaisProdutos = this.mercadorias.map((prod) => prod.totalProduto != undefined ? parseFloat(prod.totalProduto.replace(',','.')): 0);
          const totalFormatado = totaisProdutos.map((total) => total.toString().includes(".") ? total.toString().replace(".",",") : total.toString()+",00");

          //Número do cliente comprador do site
          let number = 5513991425519;
          let mensagemItems = '';
          let msg;
          
          for (let i = 0; i < this.mercadorias.length; i++) {
              mensagemItems = mensagemItems+"\r\n" + quantidadesProdutos[i]+" "+ nomesProdutos[i]+" no valor unitário de = R$"+valoresProdutos[i]+" por = R$"+ totalFormatado[i];
          }

          msg = `Olá Wagner !!! Solicito o seguinte pedido: ${mensagemItems} \r\n *Total do carrinho = R$${this.resultado}* \r\n *Meu Endereço é o seguinte: ${this.endereco}* \r\n loja: ${this.loja}`;
          
          let target = `https://api.whatsapp.com/send?phone=${encodeURIComponent(number)}&text=${encodeURIComponent(msg)}`;
          
          window.open(target,"_blank");
        }  
      }else{
        this.toastr.info("Informe o Endereço que desejas receber o pedido");
      }
      
    }
    
    obterLocalizacao(){
      let endereco;
      const successfulLookup = (position) => {
        const {latitude, longitude} = position.coords;
        
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=5847b29338a343f29fde5093488c762e`)
        .then(response => response.json())
        .then(data => {
          endereco = data.results[0].formatted;
          this.endereco = endereco;
        });
      };
      
      if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition(successfulLookup, function(position){
        }, {enableHighAccuracy: true});
      }else{
        alert('Ops ! Não foi possível obter a sua localização');
      }
    }
  }