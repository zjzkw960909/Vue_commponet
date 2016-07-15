<template lang="jade">
.page
    ul
        li(v-if="data.page !== 1", @click="prev") 上一页
        li(:class="{ 'clickColor': data.page === 1 }", @click="click") 1
        strong(v-if="data.page >= limit") ...
        li(:class="{ 'clickColor': data.page === v }", v-for="v in items()", @click="click") {{ v }}
        strong(v-if="data.pages > data.page + limit - 1") ...
        li(:class="{ 'clickColor': data.page === data.pages}", @click="click") {{ data.pages }}
        li(v-if="data.page !== data.pages", @click="next") 下一页
    .jump
        span 共{{ data.pages }}页,跳到
        input.form-control(@keyup.enter="enter")
        | 页
</template>
<script>    
export default {
    route: {
        data (transition) {
            return {
                params: transition.to.params
            }
        }
    },
    data () {
        return {
            limit: 4, //必须偶数
        }
    },
    computed: {
        data () {
            return {
                page: Number(this.$route.params.page),
                pages: 11,
            }
        },
        items () {
            //根据limit获取中间页码,limit/2代表当前页左右显示的页数,比如limit/2 = 2, 当前页5，中间显示的页码就为 3,4,5,6,7
            return () => {
                let page = this.data.page,
                    pages = this.data.pages,
                    temp = [],
                    count = 0, 
                    fixLength = this.limit/2,
                    sideLength = -fixLength,
                    loopTime = fixLength * 2 + 1;
                for (; loopTime > 0; loopTime--, count++, sideLength++) {
                    if ( count < fixLength ) {
                        if ( page + sideLength > 1 ) {
                            temp.push(page + sideLength);
                        }
                    } else if ( count === fixLength ) {
                        temp.push(page);
                    } else {
                        if ( page + sideLength < pages ) {
                            temp.push(page + sideLength);
                        }
                    }
                }
                if (page === 1){
                    temp.shift();
                }
                if (page === pages){
                    temp.pop();
                }
                return temp;  
            }
        }
    },
    methods: {
        prev () {
            this.$router.go({path: this.data.page - 1});
        },
        next () {
            this.$router.go({path: this.data.page + 1});
        },
        click (e) {
            var id = e.target.textContent;
            this.$router.go({path: id});
        },
        enter (e) {
            var page = e.target.value;
            if (page > 0 && page <= this.data.pages)
            this.$router.go({path: page});
        }
    }
}
</script>
<style>
.page{
    position: fixed;
    bottom:20px;
    left:0;
    right:0;
    margin:0 auto;
    text-align:center;
    font-size:15px;
}
.page ul{
    display:inline-block;
}
.page li{
    display:inline-block;
    margin-left:10px;
    border:1px solid #ccc;
    border-radius:10px;
    padding:5px 10px;
    cursor:pointer;
    color:#666;
    transition:background-color 0.5s
}
.page li:hover{
    background-color:rgba(193,49,44,1);
    color:#fff;
}
.page .jump{
    display:inline-block;
    color: #999;
    margin-left:30px;
}
.page input{
    display:inline-block;
    height:15px;
    width:15px;
    margin:0px 4px;
}
.page strong{
    margin-left:10px;
    color:#999;
}
.page .clickColor{
    background-color:rgba(193,49,44,1);
    color:#fff;
}
</style>





