
import { DoclistComponent } from '../documents/doclist/doclist.component';
import { WishlistComponent } from '../documents/wishlist/wishlist.component';


export class User {

   idUser: number;
   pseudo: string;
   email: string;
   password: string;
   docList: Array<DoclistComponent>;
   wishList: Array<WishlistComponent>;


  constructor(pseudo?: string, email?: string, password?: string) {
    this.pseudo = pseudo;
    this.email = email;
    this.password = password;
  }
}
