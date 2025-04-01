import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/shared/models/chocolate';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'src/app/core/services/dialog.service';
import { ChartData, ChartOptions } from 'chart.js';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-details-view',
  imports: [CommonModule, DialogModule, ButtonModule, ChartModule],
  templateUrl: './details-view.component.html',
  styleUrl: './details-view.component.css',
  standalone: true,
})
export class DetailsViewComponent implements OnInit {
  visible = false;
  product: Product | null = null;

  chartData: ChartData<'pie'> = {datasets: []};
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  constructor(private dialogService: DialogService) {}

  ngOnInit() {
    // Subscribe to dialog visibility and product data from the service
    this.dialogService.dialogVisible$.subscribe((visible) => {
      this.visible = visible;
    });

    this.dialogService.selectedProduct$.subscribe((product) => {
      this.product = product;
      
      // Only generate the chart if product and nutrition data is available
      if (this.product?.nutrition) {
        this.generateNutritionChartData(this.product.nutrition);
      }
    });
  }

  // Close the dialog when the close button is clicked
  close() {
    this.dialogService.closeDialog();
  }

  generateNutritionChartData(nutrition: any) {
    if (!nutrition) return; // Check if nutrition is defined

    // Extract nutrition data and calculate the chart data
    const labels = Object.keys(nutrition).map((key) => {
      if (typeof nutrition[key] === 'object') {
        return `${key} (total)`;
      }
      return key;
    });

    const data = Object.keys(nutrition).map((key) => {
      if (typeof nutrition[key] === 'object') {
        return nutrition[key].total;
      }
      return nutrition[key];
    });

    this.chartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
          ],
        },
      ],
    };
  }
}
