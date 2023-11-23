UPDATE accounts_user set password=(SELECT password FROM accounts_user where email='test01@gmail.com');

select * from accounts_user;