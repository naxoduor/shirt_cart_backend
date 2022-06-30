FROM mysql:8.0.19
CMD [ "--default-authentication-plugin=mysql_native_password" ]
# FROM mysql:8.0.19
COPY testdump.sql /docker-entrypoint-initdb.d/testdump.sql
EXPOSE 3307:3306
