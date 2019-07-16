import { NgModule } from '@angular/core';
import { OrderByPipe } from './orderby/orderby';
@NgModule({
	declarations: [OrderByPipe],
	imports: [],
	exports: [OrderByPipe]
})
export class PipesModule {}