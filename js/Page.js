Vue.component('page', {
    render (h) {
        return (
            <nav class="pull-right">
                <ul class="pagination">
                    <li onClick={this.prev}>
                        <a href="javascript:void(0);">«</a>
                    </li> 
                    {
                        this.tempPages.map((v, k) => {
                            if (v - 0 > 0) {
                                return <li onClick={this.jump} class={v === this.nowPage ? "active": ""}>
                                    <a href="javascript:void(0);">{v}</a>
                                </li>
                            } else {
                                return <li>
                                    <a href="javascript:void(0);">{v}</a>
                                </li>
                            }
                        })
                    }
                    <li onClick={this.next}>
                        <a href="javascript:void(0);">»</a>
                    </li> 
                </ul>
            </nav>
        )
    },
    data () {
        return {
            tempPages: [],
            limit: 2,//左右页码的数量,如总共15页，当前页是7的情况下:1 2 3...5 6 7 8 9...13 14 15
            max: 0,
            nowPage: 1,
            nowPages: 1
        }
    },
    props: {
        pages: {
            type: Number
        },
        page: {
            type: Number
        }
    },
    mounted () {
        this.nowPage = this.page
        this.nowPages = this.pages
        this.max = this.limit * 4 + 3
        this.initPage()
    },
    watch: {
        nowPage (e){
            this.$emit('emit', e)
        }
    },
    methods: {
        prev () {
            if (this.nowPage > 1) {
                this.nowPage --
                this.initPage()
            }
        },
        next () {
            if (this.nowPage < this.nowPages) {
                this.nowPage ++
                this.initPage()
            }
        },
        jump (e) {
            let target = e.target
            if (target.text) {
                this.nowPage = e.target.text - 0
            } else {
                this.nowPage = e.target.firstElementChild.text - 0
            }
            this.initPage()
        },
        initPage () {
            if (this.nowPages <= this.max) {  //没有省略号
                this.tempPages = Array.from({length: this.nowPages}, (v, k) => {
                    v = k + 1
                    return v
                })
            } else if (this.nowPage - this.limit * 2  - 1 <= 1){  //省略号在右边
                this.tempPages = Array.from({length: this.max + 1}, (v, k) => {
                    if (k + 1 <= this.limit * 3 + 2) {
                        v = k + 1
                    } else if (k + 1 === this.limit * 3 + 3) {
                        v = '...'
                    } else {
                        v = this.nowPages - (this.max - k)
                    }
                    return v
                })
            } else if (this.nowPage + this.limit * 2 + 1 >= this.nowPages) { //省略号在左边
                this.tempPages = Array.from({length: this.max + 1}, (v, k) => {
                    if (k + 1 <= this.limit * 1 + 1) {
                        v = k + 1
                    } else if (k + 1 === this.limit * 1 + 2) {
                        v = '...'
                    } else {
                        v = this.nowPages - (this.limit * 3 + 2 - (k - this.limit * 2 + 1))
                    }
                    return v
                })
            } else {
                this.tempPages = Array.from({length: this.max + 2}, (v, k) => { //两个省略号
                    if (k + 1 <= this.limit * 1 + 1) {
                        v = k + 1
                    } else if (k + 1 === this.limit * 1 + 2) {
                        v = '...'
                    } else if (k + 1 > this.limit * 1 + 2 && k + 1 < this.limit * 3 + 4) {
                        v = this.nowPage - 2 + (k - this.limit * 2)
                    } else if (k + 1 === this.limit * 3 + 4) {
                        v = '...'
                    } else {
                        v = this.nowPages - (this.limit * 3 + 3 - (k - this.limit * 2 + 1))
                    }
                    return v
                })
            }
        }
    }
})

