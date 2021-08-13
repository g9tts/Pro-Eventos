import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Evento } from '@app/models/Evento';
import { EventoService } from '@app/services/evento.service';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent implements OnInit {

  public eventos: Evento[] = [];
  public filteredEvents: Evento[] = [];
  public eventoId = 0;

  public widthImg = 150;
  public marginImg = 2;
  public showImg = true;
  private listedFilter = '';

  public get listFilter(): string {
    return this.listedFilter;
  }

  public set listFilter(value: string){
    this.listedFilter = value;
    this.filteredEvents = this.listFilter ? this.eventFilter(this.listFilter) : this.eventos;
  }

  public eventFilter(filterBy: string): Evento[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: { tema: string; local: string }) => evento.tema.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
      evento.local.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private modalRef : BsModalRef,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
    ) { }

  public ngOnInit(): void {
    this.spinner.show();
    this.carregarEventos();
  }

  public changeImg(): void {
    this.showImg = !this.showImg;
  }

  public carregarEventos(): void {
    this.eventoService.getEventos().subscribe({
        next: (eventos: Evento[]) => {
          this.eventos = eventos;
          this.filteredEvents = this.eventos;
        },
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao carregar os eventos!', 'Erro!');
        },
        complete: () => this.spinner.hide()
    });
  }

  openModal(event: any, template: TemplateRef<any>, eventoId: number): void {
    event.stopPropagation();
    this.eventoId = eventoId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef.hide();
    this.spinner.show();

    this.eventoService.deleteEvento(this.eventoId).subscribe(
      (result: any) => {
        if (result.message === 'Deletado') {
          this.toastr.success('O Evento foi deletado com Sucesso.', 'Deletado!');
          this.carregarEventos();
        }
      },
      (error: any) => {
        console.error(error);
        this.toastr.error(`Erro ao tentar deletar o evento ${this.eventoId}`, 'Erro');
      }
    ).add(() => this.spinner.hide());
  }

  decline(): void {
    this.modalRef.hide();
  }

  detalheEvento(id: number): void{
    this.router.navigate([`eventos/detalhe/${id}`]);
  }

}
