import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { PhotoService } from '../photo/photo.service';
import { PhotoDTO } from '../photo/photoDTO';

@Injectable({ providedIn: 'root' })
export class PhotoListResolver implements Resolve<Observable<PhotoDTO[]>> {
  
  constructor(private service: PhotoService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ) {
    const userName = route.params['userName'];
    
    return this.service.listFromUserPaginated(userName, 1);
  }
}