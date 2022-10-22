import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatRadioModule} from '@angular/material/radio'
import {MatSelectModule} from '@angular/material/select';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { RouterModule } from '@angular/router';
import { PostComponent } from './post.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ItemComponent } from './item.component';
import { FormsModule } from '@angular/forms';
const ItemsComponents = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatStepperModule,
  MatInputModule,
  MatProgressBarModule,
  MatRadioModule,
  FormsModule,
  MatSelectModule,
  FlexLayoutModule,
  MaterialFileInputModule
];
@NgModule({

  imports: [ItemsComponents,
    RouterModule.forChild([
      {
        path:'create', component:PostComponent
      },
      {
        path:'views', component:ItemComponent
      }
      // more lazy loading to be included here

    ])
  ],
  exports: [ItemsComponents],
  declarations: [
  ],
})
export class ItemModule {}
