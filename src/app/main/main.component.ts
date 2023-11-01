import { Component, OnInit, Inject, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Mercadoria } from 'src/app/_model/Mercadoria';
import { Validators } from '@angular/forms';
import { PdfMakeWrapper, Img } from 'pdfmake-wrapper';
import * as pdfFonts  from "pdfmake/build/vfs_fonts";
PdfMakeWrapper.setFonts(pdfFonts);

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {

  mercadorias: Mercadoria[] = [];
  mercadoria!: Mercadoria;
  resultado = '';
  endereco!: string;
  loja!: string;
  noWrapSlides = false;
  totalItens!: string;
  modalRef!: BsModalRef;
  
  ////Iogurte/////
  garrafa400: any;
  quantidadegarrafa400!: number;
  quantidadeCopo170!: number;
  garrafa170: any;
  quantidadegarrafa170!: number;
  garrafa850: any;
  quantidadegarrafa850!: number;
  sache200: any;
  quantidadeSache200!: number;
  sache1000: any;
  quantidadeSache1000!: number;
  embalagem110: any;
  quantidadeEmbalagem110!: number;
  copo120: any;
  quantidadeCopo120!: number;
  ////Manteiga/////
  poteManteiga: any;
  quantidadepoteManteiga!: number;
  ////BebLactea////
  bebLacteaGramagem900e850: any;
  bebLactea900e850: any;
  quantidadeBebLactea900e850!: number;
  bebLactea170: any;
  quantidadeBebLactea170!: number;
  /////Leites//////
  leiteOpcoes: any;
  quantidadeleiteOpcoes!: number;
  /////Queijos/////
  quantidadeQueijo!: number;
  /////Emb. Institucional////
  embInstOpcoes: any;
  quantidadeEmbInstOpcoes!: number;
  
  // iogurtes
  iogurteGarrafa400 = {nome: '', valor: '', quantidade: 0, total: 0 }; 
  iogurteGarrafa850 = {nome: '', valor: '', quantidade: 0, total: 0 };
  iogurteGarrafa170 = {nome: '', valor: '', quantidade: 0, total: 0 }; 
  iogurteSache2500 =  {nome: '', valor: '', quantidade: 0, total: 0 };  
  iogurteSache200 = {nome: '', valor: '', quantidade: 0, total: 0 };   
  iogurteSache1000 = {nome: '', valor: '', quantidade: 0, total: 0 };     
  iogurteCopo170 = {nome: '', valor: '', quantidade: 0, total: 0 } ;
  iogurteCopo120 = {nome: '', valor: '', quantidade: 0, total: 0 } ;
  iogurteEmbalagem110 = {nome: '', valor: '', quantidade: 0, total: 0 };
  
  bebidaLactea900e850 = {nome: '', valor: '', quantidade: 0, total: 0 };
  bebidaLacteaGarrafa170 = {nome: '', valor: '', quantidade: 0, total: 0 };
  
  manteiga = {nome: '', valor: '', quantidade: 0, total: 0 };
  
  queijoPadrao = {nome: '', valor: '', quantidade: 0, total: 0 };
  queijoFrescal = {nome: '', valor: '', quantidade: 0, total: 0 };
  queijoMussarela = {nome: '', valor: '', quantidade: 0, total: 0 };
  
  leite = {nome: '', valor: '', quantidade: 0, total: 0 };

  embalagemInstitucional = {nome: '', valor: '', quantidade: 0, total: 0};

  constructor(private toastr: ToastrService
    ,public router: Router
    ,public modalService: BsModalService
    ,@Inject(DOCUMENT) private document: Document) { }
    
    ngOnInit() {}
    
    iogurtes = [
      {id: 0, valor: '5,00', img: '../../assets/img/iogurte garrafa 400g.png', nome: 'Iogurte Integral 400g', color: 'color: rgb(48 16 60)' },
      
      {id: 1, valor: '2,00', img: '../../assets/img/iogurte copo natural 170g.png', nome: 'Iogurte Integral copo Natural 170g', color: 'color: rgb(48 16 60)' },
      
      {id: 2, valor: '2,00', img: '../../assets/img/iogurte garrafa 170g.png', nome: 'Iogurte Integral Garrafa 170g', color: 'color: rgb(48 16 60)' },
      
      {id: 3, valor: '6,00', img: '../../assets/img/iogurte garrafa 850g.png', nome: 'Iogurte Integral Garrafa 850g', color: 'color: rgb(48 16 60)' },
      
      {id: 4, valor: '4,00', img: '../../assets/img/iogurte sache 200g.png', nome: 'Iogurte Integral Sachê 200g', color: 'color: rgb(48 16 60)' },
      
      {id: 5, valor: '9,00', img: '../../assets/img/iogurte sache 1000g.png', nome: 'Iogurte Integral Sachê 1kg', color: 'color: rgb(48 16 60)' },
      
      {id: 6, valor: '4,00', img: '../../assets/img/iogurte embalagem 110g.png', nome: 'Iogurte Integral Embalagem 110g', color: 'color: rgb(48 16 60)' },
      
      {id: 7, valor: '3,00', img: '../../assets/img/iogurte copo sabores 120g.png', nome: 'Iogurte Integral Copo Sabores 120g', color: 'color: rgb(48 16 60)' }
      
    ];
    
    manteigas = [
      {id: 0, valor200: '3,00', valor500: '5,00', img: '../../assets/img/manteiga 200g e 500g.png', nome: 'Manteiga 200g e 500g', color: 'color: rgb(48 16 60)' },
    ];
    
    bebLacteas = [
      {id: 0, valorSache900: '10,00', valorGarrafa850: '8,00', img: '../../assets/img/beb. lactea sache 900g e garrafa 850g.png', nome: 'Bebida Láctea Sachê 900g e Garrafa de 850g', color: 'color: rgb(48 16 60)'},
      
      {id: 1, valor: '3,00', img: '../../assets/img/beb. lactea garrafa 170g.png', nome: 'Bebida Láctea Garrafa de 170g', color: 'color: rgb(48 16 60)'}
    ];
    
    leites = [
      {id: 0, valorSantaRosa: '4,00', valorJaguari: '5,00', valorHomogenizado1L: '3,00', valorHomogenizado200ml: '1,50', img: '../../assets/img/leite pasteurizado - jamava1L e 200ml resto 1L.png', nome: 'Leites Jamava 1L e 200ml', color: 'color: rgb(48 16 60)'}
    ];
    
    queijos = [
      {id: 0, valor: '12,00', img: '../../assets/img/queijo minas frescal.png', nome: 'Queijo Minas Frescal', color: 'color: rgb(48 16 60)'},
      {id: 1, valor: '10,00', img: '../../assets/img/queijo minas padrão.png', nome: 'Queijo Minas Padrão', color: 'color: rgb(48 16 60)'},
      {id: 2, valor: '15,00', img: '../../assets/img/queijo mussarela.png', nome: 'Queijo Mussarela', color: 'color: rgb(48 16 60)'}
    ];

    embInstitucionais = [
      {id: 0, valorLeite: '25,00', valorIogurte: '20,00', img: '../../assets/img/leite pasteurizado 2,5L e iogurte morango 2,5kg.png', nome: 'Embalagens Institucionais', color: 'color: rgb(48 16 60)'}
    ];
    
    preencherEmbInstitucionalNoCarrinho(){
      let embInstitArray = [{nome: '', valor: '', quantidade: 0, total: 0}];

      if(this.embInstOpcoes != null && this.quantidadeEmbInstOpcoes != null){
        let nomesProduto = {iogurte: 'Iogurte Integral 2,5kg', leite: 'Leite Pateurizado 2,5L'};

        switch(this.embInstOpcoes.toString()){
          
          case '0':  this.embalagemInstitucional = {nome: nomesProduto.iogurte, quantidade: this.quantidadeEmbInstOpcoes, valor: this.embInstitucionais[0].valorIogurte, total: this.quantidadeEmbInstOpcoes * parseFloat(this.embInstitucionais[0].valorIogurte.replace(',','.'))};break;

          case '1':  this.embalagemInstitucional = {nome: nomesProduto.leite, quantidade: this.quantidadeEmbInstOpcoes, valor: this.embInstitucionais[0].valorLeite, total: this.quantidadeEmbInstOpcoes * parseFloat(this.embInstitucionais[0].valorLeite.replace(',','.'))};break;
        }

        embInstitArray = [];
        embInstitArray = [
          {nome: this.embalagemInstitucional.nome, valor: this.embalagemInstitucional.valor, quantidade: this.embalagemInstitucional.quantidade, total: this.embalagemInstitucional.total }
        ];
        
        console.log("Institucionais: ", embInstitArray);
        for (let embIns = 0; embIns < embInstitArray.length; embIns++) {
          if(embInstitArray[embIns].nome != '' && embInstitArray[embIns].nome != undefined
          && embInstitArray[embIns].nome != null){
            this.mercadoria = { id: this.mercadorias.length, nome: embInstitArray[embIns].nome , preco: embInstitArray[embIns].valor, quantidade: embInstitArray[embIns].quantidade.toString(), totalProduto: embInstitArray[embIns].total.toFixed(2).toString().includes(".")? embInstitArray[embIns].total.toString().replace('.',',') : embInstitArray[embIns].total.toString()+",00" };
            
            var item = this.mercadoria;
            this.mercadorias.push(item);
          }
        }
      }
      this.embInstOpcoes = null;
      this.quantidadeEmbInstOpcoes = null as any;
      this.embalagemInstitucional.nome = '';   
      this.totalItens = this.mercadorias.length.toString();  

    }

    preencherQueijoNoCarrinho(id: number){
      let queijoArray = [{nome: '', valor: '', quantidade: 0, total: 0}];
      
      console.log("Peguei",id)
      if(this.quantidadeQueijo != null){
        let nomesQueijo = { padrao: 'Queijo Minas Padrão', frescal: 'Queijo Minas Frescal', mussarela: 'Queijo Mussarela' };
        
        switch(id.toString()){
          case '0': this.queijoFrescal = {nome: nomesQueijo.frescal, quantidade: this.quantidadeQueijo, valor: this.queijos[0].valor, total: this.quantidadeQueijo * parseFloat(this.queijos[0].valor.replace(',','.'))};break;
          
          case '1': this.queijoPadrao = {nome: nomesQueijo.padrao, quantidade: this.quantidadeQueijo, valor: this.queijos[1].valor, total: this.quantidadeQueijo * parseFloat(this.queijos[1].valor.replace(',','.'))};break;
          
          case '2': this.queijoMussarela = {nome: nomesQueijo.mussarela, quantidade: this.quantidadeQueijo, valor: this.queijos[2].valor, total: this.quantidadeQueijo * parseFloat(this.queijos[2].valor.replace(',','.'))};break;
        }
        queijoArray = [];
        queijoArray = [
          {nome: this.queijoFrescal.nome, valor: this.queijoFrescal.valor, quantidade: this.queijoFrescal.quantidade, total: this.queijoFrescal.total },
          {nome: this.queijoPadrao.nome, valor: this.queijoPadrao.valor, quantidade: this.queijoPadrao.quantidade, total: this.queijoPadrao.total },
          {nome: this.queijoMussarela.nome, valor: this.queijoMussarela.valor, quantidade: this.queijoMussarela.quantidade, total: this.queijoMussarela.total }
        ];
        
        console.log("Queijos: ", queijoArray);
        for (let queijo = 0; queijo < queijoArray.length; queijo++) {
          if(queijoArray[queijo].nome != '' && queijoArray[queijo].nome != undefined
          && queijoArray[queijo].nome != null){
            this.mercadoria = { id: this.mercadorias.length, nome: queijoArray[queijo].nome , preco: queijoArray[queijo].valor, quantidade: queijoArray[queijo].quantidade.toString(), totalProduto: queijoArray[queijo].total.toFixed(2).toString().includes(".")? queijoArray[queijo].total.toString().replace('.',',') : queijoArray[queijo].total.toString()+",00" };
            
            var item = this.mercadoria;
            this.mercadorias.push(item);
          }
        }
      }
      this.quantidadeQueijo = null as any;
      
      this.queijoFrescal.nome = '';   
      this.queijoPadrao.nome = '';
      this.queijoMussarela.nome = '';   
      this.totalItens = this.mercadorias.length.toString();
      
    }
    
    preencherLeiteNoCarrinho(){
      let leiteArray = [{nome: '', valor: '', quantidade: 0, total: 0}];
      let tipo = this.leiteOpcoes;
      
      if(this.leiteOpcoes != null && this.quantidadeleiteOpcoes != null){
        let nomesLeite = { santaRosa: 'Leite Santa Rosa 1L', jaguari: 'Leite Jaguari 1L', homogeinizado1L: 'Leite Homegeinizado 1L', Homegeinizado200ml: 'Leite Homegeinizado 200ml' };
        
        switch(tipo.toString()){
          
          case '0': this.leite = {nome: nomesLeite.santaRosa, quantidade: this.quantidadeleiteOpcoes, valor: this.leites[0].valorSantaRosa, total: this.quantidadeleiteOpcoes * parseFloat(this.leites[0].valorSantaRosa.replace(',','.'))};break;
          
          case '1': this.leite = {nome: nomesLeite.jaguari, quantidade: this.quantidadeleiteOpcoes, valor: this.leites[0].valorJaguari, total: this.quantidadeleiteOpcoes * parseFloat(this.leites[0].valorJaguari.replace(',','.'))};break;
          
          case '2': this.leite = {nome: nomesLeite.homogeinizado1L, quantidade: this.quantidadeleiteOpcoes, valor: this.leites[0].valorHomogenizado1L, total: this.quantidadeleiteOpcoes * parseFloat(this.leites[0].valorHomogenizado1L.replace(',','.'))};break;
          
          case '3': this.leite = {nome: nomesLeite.Homegeinizado200ml, quantidade: this.quantidadeleiteOpcoes, valor: this.leites[0].valorHomogenizado200ml, total: this.quantidadeleiteOpcoes * parseFloat(this.leites[0].valorHomogenizado200ml.replace(',','.'))};break;
          
        }
        
        leiteArray = [];
        leiteArray = [
          {nome: this.leite.nome, valor: this.leite.valor, quantidade: this.leite.quantidade, total: this.leite.total }
        ];
        
        console.log("Leites: ", leiteArray);
        for (let leite = 0; leite < leiteArray.length; leite++) {
          if(leiteArray[leite].nome != '' && leiteArray[leite].nome != undefined
          && leiteArray[leite].nome != null){
            this.mercadoria = { id: this.mercadorias.length, nome: leiteArray[leite].nome , preco: leiteArray[leite].valor, quantidade: leiteArray[leite].quantidade.toString(), totalProduto: leiteArray[leite].total.toFixed(2).toString().includes(".")? leiteArray[leite].total.toString().replace('.',',') : leiteArray[leite].total.toString()+",00" };
            
            var item = this.mercadoria;
            this.mercadorias.push(item);
          }
          
        }
        
      }
      this.leiteOpcoes = null;
      this.quantidadeleiteOpcoes = null as any;
      
      this.leite.nome = '';   
      this.totalItens = this.mercadorias.length.toString();
      
    }
    
    preencherBebLacteaNoCarrinho(){
      let bebLacteaArray = [{nome: '', valor: '', quantidade: 0, total: 0}];
      var gramagem = this.bebLacteaGramagem900e850;
      var sabor = this.bebLactea900e850;
      
      if(this.bebLacteaGramagem900e850 != null && this.bebLactea900e850 != null && this.quantidadeBebLactea900e850 != null){
        
        let gramagens900e850 = { bebLactea850: 'Garrafa 850g', bebLactea900: 'Sachê 900g'};
        let sabores = {saladaDeFrutas: 'Bebida Láctea sabor Salada de Frutas', morango: 'Bebida Láctea sabor Morango',  coco: 'Bebida Láctea sabor Côco' };
        
        console.log("gramagem ",gramagem);
        console.log("sabor ",sabor);
        if(gramagem.toString() == '0' && sabor.toString() == '0'){
          this.bebidaLactea900e850 = {nome: sabores.saladaDeFrutas +' '+ gramagens900e850.bebLactea850 , quantidade: this.quantidadeBebLactea900e850, valor: this.bebLacteas[0].valorGarrafa850!, total: this.quantidadeBebLactea900e850 * parseFloat(this.bebLacteas[0].valorGarrafa850!.replace(',','.'))};
        }else if(gramagem.toString() == '0' && sabor.toString() == '1'){
          this.bebidaLactea900e850 = {nome: sabores.morango +' '+ gramagens900e850.bebLactea850, quantidade: this.quantidadeBebLactea900e850, valor: this.bebLacteas[0].valorGarrafa850!, total: this.quantidadeBebLactea900e850 * parseFloat(this.bebLacteas[0].valorGarrafa850!.replace(',','.'))};
        }else if(gramagem.toString() == '0' && sabor.toString() == '2'){
          this.bebidaLactea900e850 = {nome: sabores.coco +' '+ gramagens900e850.bebLactea850, quantidade: this.quantidadeBebLactea900e850, valor: this.bebLacteas[0].valorGarrafa850!, total: this.quantidadeBebLactea900e850 * parseFloat(this.bebLacteas[0].valorGarrafa850!.replace(',','.'))};
        }else if(gramagem.toString() == '1' && sabor.toString() == '0'){
          this.bebidaLactea900e850 = {nome: sabores.saladaDeFrutas +' '+ gramagens900e850.bebLactea900 , quantidade: this.quantidadeBebLactea900e850, valor: this.bebLacteas[0].valorSache900!, total: this.quantidadeBebLactea900e850 * parseFloat(this.bebLacteas[0].valorSache900!.replace(',','.'))};
        }else if(gramagem.toString() == '1' && sabor.toString() == '1'){
          this.bebidaLactea900e850 = {nome: sabores.morango +' '+ gramagens900e850.bebLactea900, quantidade: this.quantidadeBebLactea900e850, valor: this.bebLacteas[0].valorSache900!, total: this.quantidadeBebLactea900e850 * parseFloat(this.bebLacteas[0].valorSache900!.replace(',','.'))};
        }else if(gramagem.toString() == '1' && sabor.toString() == '2'){
          this.bebidaLactea900e850 = {nome: sabores.coco +' '+ gramagens900e850.bebLactea900, quantidade: this.quantidadeBebLactea900e850, valor: this.bebLacteas[0].valorSache900!, total: this.quantidadeBebLactea900e850 * parseFloat(this.bebLacteas[0].valorSache900!.replace(',','.'))};
        }
        
      }
      
      if(this.bebLactea170 != null && this.quantidadeBebLactea170 != null){
        let sabores = {saladaDeFrutas: 'Bebida Láctea sabor Salada de Frutas garrafa 170g', morango: 'Bebida Láctea sabor Morango garrafa 170g',  coco: 'Bebida Láctea sabor Côco garrafa 170g' };
        
        switch(this.bebLactea170.toString()){
          case '0': this.bebidaLacteaGarrafa170 = {nome: sabores.saladaDeFrutas, quantidade: this.quantidadeBebLactea170, valor: this.bebLacteas[1].valor!, total: this.quantidadeBebLactea170 * parseFloat(this.bebLacteas[1].valor!.replace(',','.'))}; break;
          
          case '1': this.bebidaLacteaGarrafa170 = {nome: sabores.morango, quantidade: this.quantidadeBebLactea170, valor: this.bebLacteas[1].valor!, total: this.quantidadeBebLactea170 * parseFloat(this.bebLacteas[1].valor!.replace(',','.'))}; break;
          
          case '2': this.bebidaLacteaGarrafa170 = {nome: sabores.coco, quantidade: this.quantidadeBebLactea170, valor: this.bebLacteas[1].valor!, total: this.quantidadeBebLactea170 * parseFloat(this.bebLacteas[1].valor!.replace(',','.'))}; break;
          
        }
        
      }
      
      bebLacteaArray = [];
      bebLacteaArray = [
        {nome: this.bebidaLactea900e850.nome, valor: this.bebidaLactea900e850.valor, quantidade: this.bebidaLactea900e850.quantidade, total: this.bebidaLactea900e850.total }, 
        {nome: this.bebidaLacteaGarrafa170.nome, valor: this.bebidaLacteaGarrafa170.valor, quantidade: this.bebidaLacteaGarrafa170.quantidade, total: this.bebidaLacteaGarrafa170.total }
      ];
      
      console.log("Bebida Láctea: ", bebLacteaArray);
      for (let bebLactea = 0; bebLactea < bebLacteaArray.length; bebLactea++) {
        if(bebLacteaArray[bebLactea].nome != '' && bebLacteaArray[bebLactea].nome != undefined
        && bebLacteaArray[bebLactea].nome != null){
          this.mercadoria = { id: this.mercadorias.length, nome: bebLacteaArray[bebLactea].nome , preco: bebLacteaArray[bebLactea].valor, quantidade: bebLacteaArray[bebLactea].quantidade.toString(), totalProduto: bebLacteaArray[bebLactea].total.toFixed(2).toString().includes(".")? bebLacteaArray[bebLactea].total.toString().replace('.',',') : bebLacteaArray[bebLactea].total.toString()+",00" };
          
          var item = this.mercadoria;
          this.mercadorias.push(item);
        }
        
      }
      
      this.bebLacteaGramagem900e850 = null;
      this.quantidadeBebLactea900e850 = null as any;
      this.bebLactea900e850 = null;
      this.quantidadeBebLactea170 = null as any;
      this.bebLactea170 = null;
      
      this.bebidaLacteaGarrafa170.nome = '';
      this.bebidaLactea900e850.nome = '';   
      this.totalItens = this.mercadorias.length.toString();
      
      
    }
    
    preencherManteigaNoCarrinho(){
      let manteigaArray = [{nome: '', valor: '', quantidade: 0, total: 0}];
      
      if(this.poteManteiga != null && this.quantidadepoteManteiga != null){
        let gramagens = { manteiga200g: 'Manteiga 200g', manteiga500g: 'Manteiga 500g'}
        
        switch(this.poteManteiga.toString()){
          
          case '0': this.manteiga = {nome: gramagens.manteiga200g, quantidade: this.quantidadepoteManteiga, valor: this.manteigas[0].valor200, total: this.quantidadepoteManteiga * parseFloat(this.manteigas[0].valor200.replace(',','.'))}; break;
          
          case '1': this.manteiga = {nome: gramagens.manteiga500g, quantidade: this.quantidadepoteManteiga, valor: this.manteigas[0].valor500, total: this.quantidadepoteManteiga * parseFloat(this.manteigas[0].valor500.replace(',','.'))}; break;
        }
      }
      
      manteigaArray = [];
      manteigaArray = [
        {nome: this.manteiga.nome, valor: this.manteiga.valor, quantidade: this.manteiga.quantidade, total: this.manteiga.total }
      ];
      
      console.log("manteiga: ", manteigaArray);
      for (let manteiga = 0; manteiga < manteigaArray.length; manteiga++) {
        if(manteigaArray[manteiga].nome != '' && manteigaArray[manteiga].nome != undefined
        && manteigaArray[manteiga].nome != null){
          this.mercadoria = { id: this.mercadorias.length, nome: manteigaArray[manteiga].nome , preco: manteigaArray[manteiga].valor, quantidade: manteigaArray[manteiga].quantidade.toString(), totalProduto: manteigaArray[manteiga].total.toFixed(2).toString().includes(".")? manteigaArray[manteiga].total.toString().replace('.',',') : manteigaArray[manteiga].total.toString()+",00" };
          
          var item = this.mercadoria;
          this.mercadorias.push(item);
        }
        
      }
      
      this.poteManteiga = null;
      this.quantidadepoteManteiga = null as any;
      
      this.manteiga.nome = '';   
      this.totalItens = this.mercadorias.length.toString();
      
    }
    
    preencherIogurteNoCarrinho(){
      var iogurtesArray = [{nome: '', valor: '', quantidade: 0, total: 0}];
      
      if(this.garrafa400 != null && this.quantidadegarrafa400 != null){
        let sabores = {morango: 'Iogurte Garrafa 400g Sabor Morango', ameixa: 'Iogurte Garrafa 400g Sabor Amêixa', coco: 'Iogurte Garrafa 400g Sabor Côco', frutasVermelhas: 'Iogurte Garrafa 400g Sabor Frutas Vermelhas', saladaDeFrutas: 'Iogurte Garrafa 400g Sabor Salada de Frutas' };
        
        switch(this.garrafa400.toString()){
          case '0': this.iogurteGarrafa400 = {nome : sabores.morango, quantidade: this.quantidadegarrafa400, valor: '5,00', total: this.quantidadegarrafa400 * parseFloat('5,00'.replace(',','.'))}; 
          break;
          
          case '1': this.iogurteGarrafa400 = {nome : sabores.ameixa, quantidade: this.quantidadegarrafa400, valor: '5,00', total: this.quantidadegarrafa400 * parseFloat('5,00'.replace(',','.'))}; break;
          
          case '2': this.iogurteGarrafa400 = {nome : sabores.coco, quantidade: this.quantidadegarrafa400, valor: '5,00', total: this.quantidadegarrafa400 * parseFloat('5,00'.replace(',','.'))}; break;
          
          case '3': this.iogurteGarrafa400 = {nome : sabores.frutasVermelhas, quantidade: this.quantidadegarrafa400, valor: '5,00', total: this.quantidadegarrafa400 * parseFloat('5,00'.replace(',','.'))}; break;
          
          case '4': this.iogurteGarrafa400 = {nome : sabores.saladaDeFrutas, quantidade: this.quantidadegarrafa400, valor: '5,00', total: this.quantidadegarrafa400 * parseFloat('5,00'.replace(',','.'))}; break;
        }
      }
      
      if(this.quantidadeCopo170 != null){
        this.iogurteCopo170 = {nome: this.iogurtes[1].nome, quantidade: this.quantidadeCopo170, valor: this.iogurtes[1].valor, total: this.quantidadeCopo170 * parseFloat(this.iogurtes[1].valor.replace(',','.'))}
      }
      
      if(this.garrafa170 != null && this.quantidadegarrafa170 != null){
        let sabores = {ameixaCocoCereais: 'Iogurte Garrafa 170g Sabor Ameixa, Côco e Cereais', frutasVermelhas: 'Iogurte Garrafa 170g Sabor Frutas Vermelhas', flocosAveia: 'Iogurte Garrafa 170g Sabor Flocos e Avêia', ameixa: 'Iogurte Garrafa 170g Sabor Amêixa', saladaDeFrutas: 'Iogurte Garrafa 1700g Sabor Salada de Frutas', coco: 'Iogurte Garrafa 1700g Sabor Côco',  morango: 'Iogurte Garrafa 1700g Sabor Morango'};
        
        switch(this.garrafa170.toString()){
          case '0': this.iogurteGarrafa170 = {nome : sabores.ameixaCocoCereais, quantidade: this.quantidadegarrafa170, valor: '2,00', total: this.quantidadegarrafa170 * parseFloat('2,00'.replace(',','.'))}; 
          break;
          
          case '1': this.iogurteGarrafa170 = {nome : sabores.frutasVermelhas, quantidade: this.quantidadegarrafa170, valor: '2,00', total: this.quantidadegarrafa170 * parseFloat('2,00'.replace(',','.'))}; break;
          
          case '2': this.iogurteGarrafa170 = {nome : sabores.flocosAveia, quantidade: this.quantidadegarrafa170, valor: '2,00', total: this.quantidadegarrafa170 * parseFloat('2,00'.replace(',','.'))}; break;
          
          case '3': this.iogurteGarrafa170 = {nome : sabores.saladaDeFrutas, quantidade: this.quantidadegarrafa170, valor: '2,00', total: this.quantidadegarrafa170 * parseFloat('2,00'.replace(',','.'))}; break;
          
          case '4': this.iogurteGarrafa170 = {nome : sabores.ameixa, quantidade: this.quantidadegarrafa170, valor: '2,00', total: this.quantidadegarrafa170 * parseFloat('2,00'.replace(',','.'))}; break;
          
          case '5': this.iogurteGarrafa170 = {nome : sabores.coco, quantidade: this.quantidadegarrafa170, valor: '2,00', total: this.quantidadegarrafa170 * parseFloat('2,00'.replace(',','.'))}; break;
          
          case '6': this.iogurteGarrafa170 = {nome : sabores.morango, quantidade: this.quantidadegarrafa170, valor: '2,00', total: this.quantidadegarrafa170 * parseFloat('2,00'.replace(',','.'))}; break;
        }
      }
      
      if(this.garrafa850 != null && this.quantidadegarrafa850 != null){
        let sabores = { frutasVermelhas: 'Iogurte Garrafa 850g Sabor Frutas Vermelhas', natural: 'Iogurte Garrafa 850g Sabor Natural', ameixa: 'Iogurte Garrafa 850g Sabor Amêixa', saladaDeFrutas: 'Iogurte Garrafa 850g Sabor Salada de Frutas', coco: 'Iogurte Garrafa 850g Sabor Côco',  morango: 'Iogurte Garrafa 850g Sabor Morango'};
        
        switch(this.garrafa850.toString()){
          case '0': this.iogurteGarrafa850 = {nome : sabores.saladaDeFrutas, quantidade: this.quantidadegarrafa850, valor: '6,00', total: this.quantidadegarrafa850 * parseFloat('6,00'.replace(',','.'))}; 
          break;
          
          case '1': this.iogurteGarrafa850 = {nome : sabores.ameixa, quantidade: this.quantidadegarrafa850, valor: '6,00', total: this.quantidadegarrafa850 * parseFloat('6,00'.replace(',','.'))}; break;
          
          case '2': this.iogurteGarrafa850 = {nome : sabores.coco, quantidade: this.quantidadegarrafa850, valor: '6,00', total: this.quantidadegarrafa850 * parseFloat('6,00'.replace(',','.'))}; break;
          
          case '3': this.iogurteGarrafa850 = {nome : sabores.frutasVermelhas, quantidade: this.quantidadegarrafa850, valor: '6,00', total: this.quantidadegarrafa850 * parseFloat('6,00'.replace(',','.'))}; break;
          
          case '4': this.iogurteGarrafa850 = {nome : sabores.morango, quantidade: this.quantidadegarrafa850, valor: '6,00', total: this.quantidadegarrafa850 * parseFloat('6,00'.replace(',','.'))}; break;
          
          case '5': this.iogurteGarrafa850 = {nome : sabores.natural, quantidade: this.quantidadegarrafa850, valor: '6,00', total: this.quantidadegarrafa850 * parseFloat('6,00'.replace(',','.'))}; break;
          
        }
      }
      
      if(this.sache200 != null && this.quantidadeSache200 != null){
        let sabores = {morango: 'Iogurte Sachê 200g Sabor Morango',coco: 'Iogurte Sachê 200g Sabor Côco', saladaDeFrutas: 'Iogurte Sachê 200g Sabor Salada de Frutas' };
        
        switch(this.sache200.toString()){
          case '0': this.iogurteSache200 = {nome : sabores.saladaDeFrutas, quantidade: this.quantidadeSache200, valor: '4,00', total: this.quantidadeSache200 * parseFloat('4,00'.replace(',','.'))}; 
          break;
          
          case '1': this.iogurteSache200 = {nome : sabores.coco, quantidade: this.quantidadeSache200, valor: '4,00', total: this.quantidadeSache200 * parseFloat('4,00'.replace(',','.'))}; break;
          
          case '2': this.iogurteSache200 = {nome : sabores.morango, quantidade: this.quantidadeSache200, valor: '4,00', total: this.quantidadeSache200 * parseFloat('4,00'.replace(',','.'))}; break;
        }
      }
      
      if(this.sache1000 != null && this.quantidadeSache1000 != null){
        let sabores = {morango: 'Iogurte Sachê 1kg Sabor Morango', saladaDeFrutas: 'Iogurte Sachê 1kg Sabor Salada de Frutas' };
        
        switch(this.sache1000.toString()){
          case '0': this.iogurteSache1000 = {nome : sabores.saladaDeFrutas, quantidade: this.quantidadeSache1000, valor: '9,00', total: this.quantidadeSache1000 * parseFloat('9,00'.replace(',','.'))}; 
          break;
          
          case '1': this.iogurteSache1000 = {nome : sabores.morango, quantidade: this.quantidadeSache1000, valor: '9,00', total: this.quantidadeSache1000 * parseFloat('9,00'.replace(',','.'))}; break;
          
        }
      }
      
      if(this.embalagem110 != null && this.quantidadeEmbalagem110 != null){
        let sabores = {morango: 'Iogurte Embalagem 110g Sabor Morango',coco: 'Iogurte Embalagem 110g Sabor Côco', saladaDeFrutas: 'Iogurte Embalagem 110g Sabor Salada de Frutas', frutasVermelhas: 'Iogurte Embalagem 110g Sabor Frutas Vermelhas' };
        
        switch(this.embalagem110.toString()){
          case '0': this.iogurteEmbalagem110 = {nome : sabores.saladaDeFrutas, quantidade: this.quantidadeEmbalagem110, valor: '4,00', total: this.quantidadeEmbalagem110 * parseFloat('4,00'.replace(',','.'))}; 
          break;
          
          case '1': this.iogurteEmbalagem110 = {nome : sabores.coco, quantidade: this.quantidadeEmbalagem110, valor: '4,00', total: this.quantidadeEmbalagem110 * parseFloat('4,00'.replace(',','.'))}; break;
          
          case '2': this.iogurteEmbalagem110 = {nome : sabores.frutasVermelhas, quantidade: this.quantidadeEmbalagem110, valor: '4,00', total: this.quantidadeEmbalagem110 * parseFloat('4,00'.replace(',','.'))}; break;
          
          case '3': this.iogurteEmbalagem110 = {nome : sabores.morango, quantidade: this.quantidadeEmbalagem110, valor: '4,00', total: this.quantidadeEmbalagem110 * parseFloat('4,00'.replace(',','.'))}; break;
          
        }
      }
      
      if(this.copo120 != null && this.quantidadeCopo120 != null){
        let sabores = {morango: 'Iogurte Copo 120g Sabor Morango', frutasAmarelas: 'Iogurte Copo 120g Sabor Frutas Amarelas' };
        
        switch(this.copo120.toString()){
          case '0': this.iogurteCopo120 = {nome : sabores.frutasAmarelas, quantidade: this.quantidadeCopo120, valor: '3,00', total: this.quantidadeCopo120 * parseFloat('3,00'.replace(',','.'))}; 
          break;
          
          case '1': this.iogurteCopo120 = {nome : sabores.morango, quantidade: this.quantidadeCopo120, valor: '3,00', total: this.quantidadeCopo120 * parseFloat('3,00'.replace(',','.'))}; break;
          
        }
      }
      
      iogurtesArray = [];
      iogurtesArray = [ 
        {nome: this.iogurteGarrafa400.nome, quantidade: this.iogurteGarrafa400.quantidade, valor: this.iogurteGarrafa400.valor, total: this.iogurteGarrafa400.total },
        
        { nome: this.iogurteCopo170.nome, quantidade: this.iogurteCopo170.quantidade, valor: this.iogurteCopo170.valor, total: this.iogurteCopo170.total },
        { nome: this.iogurteGarrafa170.nome, quantidade: this.iogurteGarrafa170.quantidade, valor: this.iogurteGarrafa170.valor, total: this.iogurteGarrafa170.total
        },
        {nome: this.iogurteGarrafa850.nome, quantidade: this.iogurteGarrafa850.quantidade, valor: this.iogurteGarrafa850.valor, total: this.iogurteGarrafa850.total 
        },
        {nome: this.iogurteSache200.nome, quantidade: this.iogurteSache200.quantidade, valor: this.iogurteSache200.valor, total: this.iogurteSache200.total 
        },
        {nome: this.iogurteSache1000.nome, quantidade: this.iogurteSache1000.quantidade, valor: this.iogurteSache1000.valor, total: this.iogurteSache1000.total
        },
        {nome: this.iogurteEmbalagem110.nome, quantidade: this.iogurteEmbalagem110.quantidade, valor: this.iogurteEmbalagem110.valor, total: this.iogurteEmbalagem110.total 
        },
        {nome: this.iogurteCopo120.nome, quantidade: this.iogurteCopo120.quantidade, valor: this.iogurteCopo120.valor, total: this.iogurteCopo120.total 
        }
      ];
      console.log("iogurtes: ", iogurtesArray);
      for (let iogurte = 0; iogurte < iogurtesArray.length; iogurte++) {
        if(iogurtesArray[iogurte].nome != '' && iogurtesArray[iogurte].nome != undefined
        && iogurtesArray[iogurte].nome != null){
          this.mercadoria = { id: this.mercadorias.length, nome: iogurtesArray[iogurte].nome , preco: iogurtesArray[iogurte].valor, quantidade: iogurtesArray[iogurte].quantidade.toString(), totalProduto: iogurtesArray[iogurte].total.toFixed(2).toString().includes(".")? iogurtesArray[iogurte].total.toString().replace('.',',') : iogurtesArray[iogurte].total.toString()+",00" };
          
          var item = this.mercadoria;
          this.mercadorias.push(item);
        }
        
      }
      
      
      this.garrafa400 = null;
      this.quantidadegarrafa400 = null as any;
      this.quantidadeCopo170 = null as any;
      this.garrafa170 = null;
      this.quantidadegarrafa170 = null as any;
      this.garrafa850 = null;
      this.quantidadegarrafa850 = null as any;
      this.sache200 = null;
      this.quantidadeSache200 = null as any;
      this.quantidadeSache1000 = null as any;
      this.sache1000 = null;
      this.embalagem110 = null;
      this.quantidadeEmbalagem110 = null as any;
      this.copo120 = null;
      this.quantidadeCopo120 = null as any;
      
      this.iogurteGarrafa400.nome = '';
      this.iogurteCopo170.nome = '';
      this.iogurteGarrafa850.nome = '';
      this.iogurteGarrafa170.nome = '';
      this.iogurteSache200.nome = '';
      this.iogurteSache1000.nome = '';
      this.iogurteEmbalagem110.nome = '';
      this.iogurteCopo120.nome = '';   
      this.totalItens = this.mercadorias.length.toString();
      
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

    async gerarPDF(msg: string){
      console.log("Passou");
      const pdf = new PdfMakeWrapper();

      pdf.add( await new Img('../../assets/img/nomeJamava.png').build() );
      pdf.add(msg);
      pdf.create().download("JamavaPedidos.pdf");
    }

    envioWhatsApp(msg: string, number: number){
      let target = `https://api.whatsapp.com/send?phone=${encodeURIComponent(number)}&text=${encodeURIComponent(msg)}`;
          
      window.open(target,"_blank");
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
          let endereco = this.endereco != null ? `*Meu Endereço é o seguinte: ${this.endereco}*` : '';
          let loja = this.loja != null ? `*loja: ${this.loja}*` : ''; 
          let mensagemItems = '';
          let msg;
          let file = ''
          
          
          
          for (let i = 0; i < this.mercadorias.length; i++) {
            mensagemItems = mensagemItems+"\r\n" + quantidadesProdutos[i]+" "+ nomesProdutos[i]+" no valor unitário de = R$"+valoresProdutos[i]+" por = R$"+ totalFormatado[i];
          }
          
          msg = `Olá Wagner !!! Solicito o seguinte pedido: ${mensagemItems} \r\n *Total do carrinho = R$${this.resultado}* \r\n ${endereco}  \r\n ${loja}`;
          
          this.gerarPDF(msg);
          this.envioWhatsApp(msg, number);
        }  
      }else{
        this.toastr.info("Informe o Endereço que desejas receber o pedido");
      }
      
    }
    
    obterLocalizacao(){
      let endereco;
      const successfulLookup = (position:any) => {
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