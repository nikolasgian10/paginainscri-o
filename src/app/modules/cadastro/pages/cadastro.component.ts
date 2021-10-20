import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CadastroService } from 'src/app/shared/services/cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
        
  foto1 = 0;
  foto2 = 0;
  foto3 = 0;
  foto4 = 0;

  foto1_ext = '';
  foto2_ext = '';
  foto3_ext = '';
  foto4_ext = '';

  foto1_aux = 0;
  foto2_aux = 0;
  foto3_aux = 0;
  foto4_aux = 0;

  public formularioDeCadastro: FormGroup;

  private sub: Subscription = new Subscription;

  constructor(
    private formbuilder: FormBuilder,
    private cadastroService: CadastroService

  ) {
    this.formularioDeCadastro = this.formbuilder.group({
      nomeCompleto: ['', [Validators.required, Validators.minLength(3)]],
      dataNascimento: [null, Validators.required],
      cpf: [null, Validators.required],
      orientacaoSexual: [null, Validators.required],
      nacionalidade: [null, Validators.required],
      naturalidade: [null, Validators.required],
      endereco: [null, [Validators.required]],
      phone1: [null, [Validators.required]],
      phone2: [null],
      responsavel: [null, [Validators.required, Validators.minLength(3)]],
      cpfResponsavel: [null, [Validators.required]],
      comprovanteResidencial: [null, [Validators.required]],
      declaracaoDeficiencia: [null],
      documentodoResponsavel:[null, [Validators.required]],
      documentodoAluno: [null, [Validators.required]],
    })


  }

  ngOnInit(): void {
    
    let dadosAntigos = this.cadastroService.read(1)
    if (dadosAntigos)
      this.formularioDeCadastro.patchValue(dadosAntigos)
  }

  ngOndestoy(): void {
    this.sub.unsubscribe()

  }
  
  public setcomprovanteResidencial(event: any) {
    let arquivo = event.target.files?.[0]

    let me:any = this;
   
    let file = event.target.files[0];
    
    this.foto1_ext =  event.target.files[0].name.split('.').pop();

    let reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = function () {
      me.foto1 = reader.result;
      me.formularioDeCadastro.patchValue({ comprovanteResidencial: JSON.stringify({"foto": me.foto1, "ext": me.foto1_ext}) });
      me.formularioDeCadastro.markAllAsTouched();
    };
   
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
    
    
  }

  public setdeclaracaoDeficiencia(event: any) {
    let arquivo = event.target.files?.[0]
    let me:any = this;
   
    let file = event.target.files[0];
    
    this.foto2_ext = event.target.files[0].name.split('.').pop();

    let reader = new FileReader();

    reader.readAsDataURL(file);
    
    reader.onload = function () {
      me.foto2 = reader.result;
      me.formularioDeCadastro.patchValue({ declaracaoDeficiencia: JSON.stringify({"foto": me.foto2, "ext": me.foto2_ext}) });
      me.formularioDeCadastro.markAllAsTouched();
    };
   
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

  }

  public setdocumentoResponsavel(event: any) {
    let arquivo = event.target.files?.[0]

    let me:any = this;
   
    let file = event.target.files[0];
    
    this.foto3_ext = event.target.files[0].name.split('.').pop();

    let reader = new FileReader();

    reader.readAsDataURL(file);
    
    reader.onload = function () {
      me.foto3 = reader.result;
      me.formularioDeCadastro.patchValue({ documentodoResponsavel: JSON.stringify({"foto": me.foto3, "ext": me.foto3_ext}) });
      me.formularioDeCadastro.markAllAsTouched();
    };
   
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  public setdocumentoAluno(event: any) {
    let arquivo = event.target.files?.[0]

    let me:any = this;
   
    let file = event.target.files[0];
    
    this.foto4_ext = event.target.files[0].name.split('.').pop();

    let reader = new FileReader();

    reader.readAsDataURL(file);
    
    reader.onload = function () {
      me.foto4 = reader.result;      
      me.formularioDeCadastro.patchValue({ documentodoAluno: JSON.stringify({"foto": me.foto4, "ext": me.foto4_ext}) });
      me.formularioDeCadastro.markAllAsTouched();

    };
   
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  public getTemComprovante(): boolean {
    if (this.formularioDeCadastro.get('comprovanteResidencial')?.value != null)
      return true
    else
      return false
  }

  public getTemDeclaracao(): boolean {
    if (this.formularioDeCadastro.get('declaracaoDeficiencia')?.value != null)
      return true
    else
      return false
  }
  public getTemDocumento(): boolean {
    if (this.formularioDeCadastro.get('documentodoResponsavel')?.value != null)
      return true
    else
      return false
  }
  public getTemRegistro(): boolean {
    if (this.formularioDeCadastro.get('documentodoAluno')?.value != null)
      return true
    else
      return false
  }

  save() {
    this.cadastroService.save(this.formularioDeCadastro.getRawValue())
   
  }
}
