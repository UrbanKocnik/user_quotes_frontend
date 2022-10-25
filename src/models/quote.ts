import User from "./user";

export class Quote{
    id: number;
    quote: string;
    likes: number;
    dislikes: number;
    rating: number;
    user: User;

    constructor(id = 0, quote = '', likes = 0, dislikes = 0, rating = 0, user = new User()){
            this.id = id;
            this.quote = quote;
            this.likes = likes;
            this.dislikes = dislikes;   
            this.rating = rating;   
            this.user = user
    }
}
export default Quote;