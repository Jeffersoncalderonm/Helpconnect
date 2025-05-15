import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exportar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exportar.component.html',
  styles: ``
})
export class ExportarComponent {
  solicitudes = [
    { id: 1, tipo: 'Queja', estado: 'Pendiente', fecha: '2025-03-11' },
    { id: 2, tipo: 'Reclamo', estado: 'Resuelto', fecha: '2025-03-10' },
    { id: 3, tipo: 'Petición', estado: 'En Proceso', fecha: '2025-03-09' },
    { id: 4, tipo: 'Sugerencia', estado: 'Pendiente', fecha: '2025-03-08' },
    { id: 5, tipo: 'Queja', estado: 'Resuelto', fecha: '2025-03-07' }
  ];

  exportarPDF() {
    console.log('Exportando a PDF...');
  }

  exportarExcel() {
    console.log('Exportando a Excel...');
  }

  exportarCSV() {
    console.log('Exportando a CSV...');
  }
}