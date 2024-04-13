import { Injectable } from '@angular/core';
import { ModalService } from './modal-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProductAddedService {

  constructor(public modalService: ModalService) { }

}
