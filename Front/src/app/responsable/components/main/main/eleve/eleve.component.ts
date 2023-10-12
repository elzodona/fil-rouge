import { Component } from '@angular/core';
import { BreukhService } from 'src/app/services/breukh/breukh.service';

@Component({
  selector: 'app-eleve',
  templateUrl: './eleve.component.html',
  styleUrls: ['./eleve.component.css']
})
export class EleveComponent {

  classes: any
  name: any;
  file: any
  id: any;
  formData = new FormData();
  fileSelected = false;



  constructor(private breukh: BreukhService){}

  ngOnInit()
  {
    this.addStudent();
  }

  addStudent()
  {
    this.breukh.getResources().subscribe((res:any)=>{
      this.classes = res.classes
      console.log(this.classes);
      
    })
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const selectedFile = inputElement.files?.[0] as File;

    if (selectedFile) {
      this.formData.append('file', selectedFile);
      this.formData.append('classe_id', this.id);
      this.formData.append('annee_id', '1');
      this.fileSelected = true;
    }
  }

  save() {
    if (this.fileSelected) {
      this.breukh.addEtudiant(this.formData).subscribe(res => {
        console.log(res);
      })
    }
    const modal = document.getElementById('modal')
    if (modal) {
      modal.style.display = 'none';
    }
  }

  inscrire(id: number) {
    // console.log(id);
    this.id = id;
    const modal = document.getElementById('modal')
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal()
  {
    const modal = document.getElementById('modal')
    if (modal) {
      modal.style.display = 'none';
    }    
  }


}