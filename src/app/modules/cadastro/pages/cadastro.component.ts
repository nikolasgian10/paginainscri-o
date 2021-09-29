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

  public formularioDeCadastro: FormGroup;

  private sub: Subscription = new Subscription;

  constructor(
    private formbuilder: FormBuilder,
    private cadastroService: CadastroService

  ) {
    this.formularioDeCadastro = this.formbuilder.group({
      nomeCompleto: ['', [Validators.required, Validators.minLength(3)]],
      dataNascimento: [null, Validators.required],
      idade: [null, Validators.required],
      orientacaoSexual: [null, Validators.required],
      nacionalidade: [null, Validators.required],
      naturalidade: [null, Validators.required],
      endereco: [null, [Validators.required]],
      phone1: [null, [Validators.required]],
      phone2: [null],
      responsavel: [null],
      comprovanteResidencial: [null, [Validators.required]],
      declaracaoDeficiencia: [null],
      documentodoResponsavel:[null, [Validators.required]],
      documentoodoAluno: [null, [Validators.required]],
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
    this.formularioDeCadastro.patchValue({ comprovanteResidencial: arquivo });
    this.formularioDeCadastro.markAllAsTouched();
  }

  public setdeclaracaoDeficiencia(event: any) {
    let arquivo = event.target.files?.[0]
    this.formularioDeCadastro.patchValue({ declaracaoDeficiencia: arquivo });
    this.formularioDeCadastro.markAllAsTouched();
  }
  public setdocumentoResponsavel(event: any) {
    let arquivo = event.target.files?.[0]
    this.formularioDeCadastro.patchValue({ documentoResponsavel: arquivo });
    this.formularioDeCadastro.markAllAsTouched();
  }

  public setdocumentoAluno(event: any) {
    let arquivo = event.target.files?.[0]
    this.formularioDeCadastro.patchValue({ documentoAluno: arquivo });
    this.formularioDeCadastro.markAllAsTouched();
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
    if (this.formularioDeCadastro.get('documentoResponsavel')?.value != null)
      return true
    else
      return false
  }
  public getTemRegistro(): boolean {
    if (this.formularioDeCadastro.get('registroAluno')?.value != null)
      return true
    else
      return false
  }


   





  save() {
    this.cadastroService.save(this.formularioDeCadastro.getRawValue())
   
  }
}
