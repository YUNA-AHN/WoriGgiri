UPDATE accounts_user set password=(SELECT password FROM accounts_user where email='asdasd@naver.com');

select * from accounts_user;