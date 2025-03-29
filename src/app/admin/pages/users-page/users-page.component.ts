import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { Users } from '../../../interfaces/users.interface'

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
})
export class UsersPageComponent implements OnInit {
  users: Users[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe({
      next: (data) => {
        console.log(data);
        this.users = data;
        this.isLoading = false;
        localStorage.setItem('userCount', data.length.toString());

      },
      error: (err) => {
        this.error = 'Failed to load users';
        this.isLoading = false; 
        console.error(err);
      }
    });
  }
}