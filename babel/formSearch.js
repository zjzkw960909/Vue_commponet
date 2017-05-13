"use strict";

//form-search(:options="options", v-on:emit="btnClick")
//options: 数组：没有下拉只用一个对象就可以，如果有下拉，使用数组。对象参数 name:button名字, icon:icon标签，value:给后端传递的数据。
//btnClick: emit回父组件点击的数据。父组件用btnClick触发事件
Vue.component('form-search', {
    render: function render(h) {
        var _this = this;

        return h(
            "div",
            { "class": "form-group" },
            [this.operateOptions.map(function (v, k) {
                if (v.length) {
                    var key = v[0].key || 1;
                    return h(
                        "div",
                        { "class": "btn-group" },
                        [h(
                            "button",
                            {
                                on: {
                                    "click": _this.open
                                },
                                attrs: { k: k + 1, type: "button", value: v[key].value },
                                "class": ["btn btn-sm dropdown-toggle", v[key].value === _this.select ? 'btn-info' : 'btn-default'] },
                            [h(
                                "span",
                                { "class": ["glyphicon", v[key].icon] },
                                []
                            ), v[key].name, h(
                                "span",
                                { "class": "caret" },
                                []
                            )]
                        ), h(
                            "ul",
                            { "class": "dropdown-menu search-type-list", style: "display:block", directives: [{
                                    name: "show",
                                    value: _this.openStatus === k + 1
                                }]
                            },
                            [v.map(function (v1, k1) {
                                return h(
                                    "li",
                                    {
                                        directives: [{
                                            name: "show",
                                            value: k1 !== 0
                                        }]
                                    },
                                    [h(
                                        "a",
                                        {
                                            attrs: { href: "javascript:void(0)", value: v1.value, k: k1 },
                                            on: {
                                                "click": _this.btnClick
                                            }
                                        },
                                        [h(
                                            "span",
                                            { "class": ["glyphicon", v1.icon] },
                                            []
                                        ), " ", v1.name]
                                    )]
                                );
                            })]
                        )]
                    );
                } else {
                    return h(
                        "button",
                        {
                            on: {
                                "click": _this.btnClick
                            },
                            "class": ["btn btn-sm", v.value === _this.select ? 'btn-info' : 'btn-default'], attrs: { type: "button", value: v.value }
                        },
                        [h(
                            "span",
                            { "class": ["glyphicon", v.icon] },
                            []
                        ), " ", v.name]
                    );
                }
            })]
        );
    },
    data: function data() {
        return {
            select: 1,
            openStatus: null,
            operateOptions: []
        };
    },

    props: {
        options: {
            type: Array
        }
    },
    mounted: function mounted() {
        this.operateOptions = this.options.map(function (v) {
            if (v.length) {
                v.unshift({ key: 0 });
            }
            return v;
        });
    },

    methods: {
        open: function open(e) {
            var k = void 0;
            if (e.target.getAttribute('k')) {
                k = e.target.getAttribute('k') - 0;
            } else {
                k = e.target.parentElement.getAttribute('k') - 0;
            }
            if (this.openStatus !== k) {
                this.openStatus = k;
            } else {
                this.openStatus = null;
            }
        },
        btnClick: function btnClick(e) {
            var value = void 0,
                target = e.target;

            if (target.value || target.parentElement.value) {
                value = (target.value || target.parentElement.value) - 0;
            } else {
                value = (target.getAttribute('value') || target.parentElement.getAttribute('value')) - 0;
            }
            this.select = value;
            this.$emit('emit', value);
            if (this.openStatus) {
                this.operateOptions[this.openStatus - 1][0].key = target.getAttribute('k') || target.parentElement.getAttribute('k');
                this.openStatus = null;
            }
        }
    }
});