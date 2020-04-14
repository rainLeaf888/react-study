# 指定nginx运行的用户 和用户组
#user  nobody;

# nginx进程数（最合适的数值是cpu的核数，也可以是cpu核数的2倍）
worker_processes  1;

# 设置错误日志文件存放路径（日志级别 -从低到高：debug | info | notice | warn | error | crit）
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

# 设置存储nginx进程id的pid文件存放路径（pid是控制系统中的重要文件）
#pid        logs/nginx.pid;

# 工作模式与连接数上线
events {
# use用来指定nginx的工作模式
# use epoll

#设置单个进程最大连接数
    worker_connections  1024;
}

# http服务器配置部分
http {
# 文件扩展名与文件类型映射表
    include       mime.types;

# 默认文件类型为 二进制流
    default_type  application/octet-stream;

# 指定日志的输出格式[$remote_addr:客户端ip地址;$remote_user:客户端用
户名;$request:请求的url;$status:请求状态;$body_bytes_sent:服务器返回
给客户端的字节数;$http_referer:父级网页（从那个网页进入这里来的）;$http_user_agent:客户端浏览器信息;$http_x_forwarded_for:客户端ip地址;]
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

# 配置nginx日志文件存储路径，名称。配置 access_log	off则不记录日志
    #access_log  logs/access.log  main;

# 开启高效文件传输模式，sendfile指令 指定nginx是否调用sendfile函数来
输出文件，对于普通应用设置为on，如果用来进行下载等应用磁盘IO重负载应
用，可设置为off，以平衡磁盘与网络I/O处理速度，降低系统的负载。注意⚠️ 如果图片显示不正常 把这个改成off
    sendfile        on;

# 防止网络阻塞
    #tcp_nopush     on;

# 设置客户端连接保持活动的超时时间。超过这个设定时间后 服务器会关掉>这个连接
    #keepalive_timeout  0;
    keepalive_timeout  65;

# gzip模块设置
# 是否开启gzip压缩
    #gzip  on;

# 虚拟主机的配置部分
    server {
# 监听端口
        listen       80;

# 域名（可以有多个，空格隔开）
        server_name  localhost;

# 设置字符编码
        #charset koi8-r;

# 设置访问日志存放路径，main用于指定访问日志输出格式
        #access_log  logs/host.access.log  main;

# URL匹配配置部分（nginx配置中最灵活的部分）支持正则表达式，条件判断
匹配，可以实现nginx对动、静态网友的过滤处理
        location / {
# 设置网页的根目录，nginx默认发布网页的目录是/usr/local/webserver/mginx/html
            root   html;

# 默认首页地址
            index  index.html index.htm;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

	# 跨越设置
        # add_header 'Access-Control-Allow-Origin' "*";
        # add_header 'Access-Control-Allow-Credentials' 'true';
        # 对那些可能对服务器数据产生副作用的HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME
        # 类型的 POST 请求），浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从
        # 而获知服务端是否允许该跨域请求。服务器确认允许之后，才发起实际的 HTTP 请求。在预检请求的返回中，服务
        # 器端也可以通知客户端，是否需要携带身份凭证（包括 Cookies 和 HTTP 认证相关数据）
	if ($request_method = 'OPTIONS') {
    	    add_header 'Access-Control-Allow-Origin' "$http_origin"; // * 重要
	    add_header 'Content-Type' 'text/plain charset=UTF-8';
	    add_header 'Access-Control-Allow-Credentials' 'true';  // * 重要
	    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
	    add_header 'Access-Control-Allow-Headers' 'x-pingother,DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,x-source,token,deviceid,source';
	    add_header 'Content-Length' 0;
    	    add_header 'Access-Control-Max-Age' 86400;
    	   return 204;
	}

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #  使用http2时，配置如下（且要求openssl 和nginx 版本）
    #    listen  443 ssl http2;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

        location /mozart/web {
            proxy_pass http://opc_yummy_web;
        }

        location / {
            rewrite  ^.*$ /mozart/web/Welcome  redirect;
        }

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }

    #}
    include servers/*;
}
