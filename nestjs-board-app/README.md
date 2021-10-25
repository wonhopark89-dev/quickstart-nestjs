# (๑꒪▿꒪)*
```
- Database: Postgresql
- Database Viewer : pgAdmin
```

#### install
```
brew install postgresql
```
#### postgresql service start
```
brew services start postgresql
```
#### check postgresql user
```
$ psql postgres
postgres=# \du
```

-----
### Moddule, Controller, Service 생성  
( 테스트 코드 옵션 제외 )
```
nest g module auth
nest g controller auth --no-spec
nest g service auth --no-spec
```
