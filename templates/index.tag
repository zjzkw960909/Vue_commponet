html
    head
        meta(charset="utf-8" name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no")
        link(rel="stylesheet", href="http://v3.bootcss.com/dist/css/bootstrap.min.css")
        link(rel="stylesheet", href="http://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css")
        link(rel="stylesheet", href="../static/base.css")
    body
        #app
            .container
                page(:pages="pages", :page="page", v-on:emit="changePage")
            .container
                form-search(:options="options", v-on:emit="changePage")
        script(type="text/javascript", src="http://cdn.bootcss.com/vue/2.3.2/vue.js")
        script(type="text/javascript", src="../babel/page.js")
        script(type="text/javascript", src="../babel/formSearch.js")
        script(type="text/javascript", src="../babel/index.js")
            
        
