import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService, AuthenticationService } from '../_services';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit, OnDestroy {
  heroes: Hero[] = [];
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  constructor(
    private heroService: HeroService,
    private authenticationService: AuthenticationService,
    private userService: UserService
) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
        this.currentUser = user;
    });
}

  ngOnInit() {
    this.getHeroes();
    this.loadAllUsers();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => {
          this.heroes = heroes}
      );
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
}

deleteUser(id: number) {
    this.userService.delete(id).pipe(first()).subscribe(() => {
        this.loadAllUsers();
    });
}

private loadAllUsers() {
    // this.userService.getAll().pipe(first()).subscribe(users => {
    //     this.users = users;
    // });
}
}
