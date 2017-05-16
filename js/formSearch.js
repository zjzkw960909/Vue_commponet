//form-search(:options="options", v-on:emit="btnClick")
//options: 数组：没有下拉只用一个对象就可以，如果有下拉，使用数组。对象参数 name:button名字, icon:icon标签，value:给后端传递的数据。
//btnClick: emit回父组件点击的数据。父组件用btnClick触发事件
Vue.component('form-search', {
    render (h) {
        return (
            <div class="form-group">
            {
                this.operateOptions.map((v, k) => {
                    if (v.length) {
                        let key = v[0].key  || 1
                        return  <div class="btn-group">
                                    <button onClick={this.open} k={k + 1} class={["btn btn-sm dropdown-toggle", v[key].opts.value === this.select ? 'btn-info' : 'btn-default']} type="button" value={v[key].opts.value} keyName={v.opts.key}>
                                        <span class={["glyphicon", v[key].icon]}></span>{v[key].name}
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu search-type-list" style="display:block" v-show={this.openStatus === k + 1}>
                                    {
                                        v.map((v1, k1) => {
                                            return  <li v-show={k1 !== 0}>
                                                    <a href="javascript:void(0)" onClick={this.btnClick} value={v1.opts.value} keyName={v1.opts.key} k={k1}>
                                                        <span class={["glyphicon", v1.icon]}></span> {v1.name}
                                                    </a>
                                                </li>
                                        })
                                    }
                                    </ul>
                                </div>
                    } else {
                        return  <button onClick={this.btnClick} class={["btn btn-sm", v.opts.value === this.select ? 'btn-info' : 'btn-default']} type="button" value={v.opts.value} keyName={v.opts.key}>
                                <span class={["glyphicon", v.icon]}></span> {v.name}
                            </button>
                    
                    }
                })
            }
            </div>
        )
    },
    data () {
        return {
            select: 0,
            openStatus: null,
            operateOptions: []
        }
    },
    props: {
        options: {
            type: Array
        }
    },
    mounted () {
        this.operateOptions = this.options.map((v) => {
            if (v.length) {
                v.unshift({key: 0})   
            }
            return v
        }) 
    },
    methods: {
        open (e) {
            let k
            if (e.target.getAttribute('k')) {
                k = e.target.getAttribute('k') - 0
            } else {
                k = e.target.parentElement.getAttribute('k') - 0
            }
            if (this.openStatus !== k) {
                this.openStatus = k
            } else {
                this.openStatus = null
            }
        },
        btnClick (e) {
            let value, key,
                target = e.target

            if (target.value || target.parentElement.value) {
                value = (target.value  || target.parentElement.value) - 0
            } else {
                value = (target.getAttribute('value') || target.parentElement.getAttribute('value')) - 0
            }
            key = (target.getAttribute('keyName') || target.parentElement.getAttribute('keyName'))
            this.select = value
            this.$emit('emit', {key: key, value: value})
            if (this.openStatus) {
                this.operateOptions[this.openStatus - 1][0].key = target.getAttribute('k') || target.parentElement.getAttribute('k')
                this.openStatus = null
            }
        }
    }
})

