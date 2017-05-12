Vue.component('page', {
    render (h) {
        return (
            <nav class="pull-right">
                <ul class="pagination">
                    <li onClick="prev">
                        <a href="javascript:void(0);">«</a>
                    </li> 
                    {
                        this.tempPages.map((v, k) => {
                            return <li onClick="click">
                                <a href="javascript:void(0);">{k + 1}</a>
                            </li>
                        })
                    }
                    <li onClick="next">
                        <a href="javascript:void(0);">»</a>
                    </li> 
                </ul>
            </nav>
        )
    },
    data () {
        return {
            tempPages: [],
            limit: 4
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
        this.tempPages = Array.from({length: this.pages})
    },
    methods: {
    }
})

