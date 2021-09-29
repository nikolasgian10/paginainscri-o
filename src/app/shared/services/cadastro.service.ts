import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(private http: HttpClient) { }

  private readonly rotaPadrao = 'api/cadastro';

  async save(cadastro: any): Promise<any> {

    window.localStorage.setItem('logCaDASTRO', JSON.stringify(cadastro))

    let fullFormData: FormData = new FormData();
    for (const key of Object.keys(cadastro)) {
      const value = cadastro[key];
      fullFormData.append(key, value);
    }

    // LOCALHOST
    window.localStorage.setItem('logCaDASTRO', JSON.stringify(cadastro))

    // API
    await this.http.post<any>(`${this.rotaPadrao}`, fullFormData).toPromise().then((result: any) => {
      return result
    }).catch((err: any) => {
      console.log(err);
      return null
    });
  }

  async read(id: number): Promise<{ nomeCompleto: string; comprovanteResidencial: File; } | null> {
    // LOCALHOST
    let dadosAntigos = window.localStorage.getItem('logCaDASTRO')
    if (dadosAntigos)
      return JSON.parse(dadosAntigos)
    return null

    // API
    return await this.http.get<any>(`${this.rotaPadrao}/${id}`).toPromise().then(request => {
      return request;
    }).catch(() => {
      return null;
    });
  }
}
