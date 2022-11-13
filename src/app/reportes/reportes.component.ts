import { Component, OnInit } from '@angular/core';
import { Chart, ChartData, registerables } from 'chart.js';
import { ReportesService } from '../services/reportes.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
})
export class ReportesComponent implements OnInit {
  charDataBarras: any;
  charDataVictorias: any;
  charDataVictorias21: any;

  labeldataBarras: any = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
    'Domingo',
  ];

  labelDataJugador: any = [
    'jugador',
    'Crupier',
  ];



  constructor(private reportesService: ReportesService) {}

  ngOnInit(): void {
    this.cargarDataRepo1();
    this.cargarDataRepo2();
    this.cargarDataRepo3();

  }

  cargarDataRepo1() {
    this.reportesService.getJugadasPorDia().subscribe((data: any) => {
      this.charDataBarras = data;
      this.cargarReportes(this.labeldataBarras, this.charDataBarras);
    });
  }

  cargarDataRepo2(){
    this.reportesService.getVictoriaNormales().subscribe((data: any) => {
      this.charDataVictorias = data;
      this.cargarReportes2(this.labelDataJugador, this.charDataVictorias);
    });
  }

  cargarDataRepo3(){
    this.reportesService.getVictoriaJugador21().subscribe((data: any) => {
      this.charDataVictorias21 = data;
      this.cargarReportes3(this.labelDataJugador, this.charDataVictorias21);
    });
  }

  cargarReportes(labeldata: any, charDataBarras: any) {
    const myChart = new Chart('barras', {
      type: 'bar',
      data: {
        labels: labeldata,
        datasets: [
          {
            label: '# of Votes',
            data: charDataBarras,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  cargarReportes2(labeldata: any, charDataVictorias: any) {
    const myChart2 = new Chart('pieVictorias', {
      type: 'pie',
      data: {
        labels: labeldata,
        datasets: [
          {
            label: '# of Votes',
            data: charDataVictorias,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  cargarReportes3(labeldata: any, charDataVictorias21: any) {
    const myChart3 = new Chart('pieVictorias21', {
      type: 'pie',
      data: {
        labels: labeldata,
        datasets: [
          {
            label: '# of Votes',
            data: charDataVictorias21,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
