import { bootstrap } from "angular2/platform/browser";
import { Component } from "angular2/core";
import { NgFor } from "angular2/common";

//Plain Article class starts here
class Article {
    title:string;
    link:string;
    votes:number;

    constructor(title:string, link:string, votes?:number) {
        this.title = title;
        this.link = link;
        this.votes = votes || 0;
    }

    voteUp() {
        this.votes += 1;
    }

    voteDown() {
        this.votes -= 1;
    }

}
//Plain Article class ends here

//Redit article starts here
@Component({
    selector: 'reddit-article',
    inputs: ['article'],
    host: {
        class: 'row'
    },
    template: `
    <div class="four wide column center aligned votes">
      <div class="ui statistic">
        <div class="value">
        {{article.votes}}
        </div>
        <div class="label">
          Points
        </div>
      </div>
    </div>
    <div class="twelve wide column">
      <a class="ui large header" href="{{article.link }}">
        {{ article.title }}
      </a>
      <ul class="ui big horizontal list voters">
        <li class="item">
          <a href (click)="voteUp()">
            <i class="arrow up icon"></i>
              upvote
            </a>
        </li>
        <li class="item">
          <a href (click)="voteDown()">
            <i class="arrow down icon"></i>
            downvote
          </a>
        </li>
      </ul>
    </div>
  `
})

class ArticleComponent {
    article:Article;


    constructor() {
        console.log(this.article)
    }


    voteUp():boolean {
        this.article.voteUp();
        return false;
    }

    voteDown():boolean {
        this.article.voteDown();
        return false;
    }
}

//Reddit article ends here

@Component({
    selector: 'reddit',
    directives: [ArticleComponent],
    template: `
  <form class="ui large form segment" (submit)="addArticle(newTitle, newLink)">
      <h3 class="ui header">Add a Link</h3>

      <div class="field">
        <label for="title">Title:</label>
        <input name="title" #newTitle required>
      </div>
      <div class="field">
        <label for="link">Link:</label>
        <input name="link" #newLink required>
      </div>
      <button class="ui positive right floated button">
      Submit Link
      </button>
    </form>
     <div class="ui grid posts">
        <reddit-article *ngFor="#article of articles" [article]="article"></reddit-article>
     </div>

  `
})

class RedditApp {
    articles:Article[];

    constructor() {
        this.articles = [];
    }

    addArticle(title:HTMLInputElement, link:HTMLInputElement):void {

        this.articles.push(new Article(title.value, link.value));
        title.value = '';
        link.value = '';

        console.log(`Adding article title: ${title.value} and link: ${link.value}`);
    }

}

bootstrap(RedditApp);
