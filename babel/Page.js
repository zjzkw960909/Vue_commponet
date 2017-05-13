"use strict";

Vue.component('page', {
    render: function render(h) {
        var _this = this;

        return h(
            "nav",
            { "class": "pull-right" },
            [h(
                "ul",
                { "class": "pagination" },
                [h(
                    "li",
                    {
                        on: {
                            "click": this.prev
                        }
                    },
                    [h(
                        "a",
                        {
                            attrs: { href: "javascript:void(0);" }
                        },
                        ["\xAB"]
                    )]
                ), this.tempPages.map(function (v, k) {
                    if (v - 0 > 0) {
                        return h(
                            "li",
                            {
                                on: {
                                    "click": _this.jump
                                },
                                "class": v === _this.nowPage ? "active" : "" },
                            [h(
                                "a",
                                {
                                    attrs: { href: "javascript:void(0);" }
                                },
                                [v]
                            )]
                        );
                    } else {
                        return h(
                            "li",
                            null,
                            [h(
                                "a",
                                {
                                    attrs: { href: "javascript:void(0);" }
                                },
                                [v]
                            )]
                        );
                    }
                }), h(
                    "li",
                    {
                        on: {
                            "click": this.next
                        }
                    },
                    [h(
                        "a",
                        {
                            attrs: { href: "javascript:void(0);" }
                        },
                        ["\xBB"]
                    )]
                )]
            )]
        );
    },
    data: function data() {
        return {
            tempPages: [],
            limit: 2, //左右页码的数量,如总共15页，当前页是7的情况下:1 2 3...5 6 7 8 9...13 14 15
            max: 0,
            nowPage: 1,
            nowPages: 1
        };
    },

    props: {
        pages: {
            type: Number
        },
        page: {
            type: Number
        }
    },
    mounted: function mounted() {
        this.nowPage = this.page;
        this.nowPages = this.pages;
        this.max = this.limit * 4 + 3;
        this.initPage();
    },

    watch: {
        nowPage: function nowPage(e) {
            this.$emit('emit', e);
        }
    },
    methods: {
        prev: function prev() {
            if (this.nowPage > 1) {
                this.nowPage--;
                this.initPage();
            }
        },
        next: function next() {
            if (this.nowPage < this.nowPages) {
                this.nowPage++;
                this.initPage();
            }
        },
        jump: function jump(e) {
            var target = e.target;
            if (target.text) {
                this.nowPage = e.target.text - 0;
            } else {
                this.nowPage = e.target.firstElementChild.text - 0;
            }
            this.initPage();
        },
        initPage: function initPage() {
            var _this2 = this;

            if (this.nowPages <= this.max) {
                //没有省略号
                this.tempPages = Array.from({ length: this.nowPages }, function (v, k) {
                    v = k + 1;
                    return v;
                });
            } else if (this.nowPage - this.limit * 2 - 1 <= 1) {
                //省略号在右边
                this.tempPages = Array.from({ length: this.max + 1 }, function (v, k) {
                    if (k + 1 <= _this2.limit * 3 + 2) {
                        v = k + 1;
                    } else if (k + 1 === _this2.limit * 3 + 3) {
                        v = '...';
                    } else {
                        v = _this2.nowPages - (_this2.max - k);
                    }
                    return v;
                });
            } else if (this.nowPage + this.limit * 2 + 1 >= this.nowPages) {
                //省略号在左边
                this.tempPages = Array.from({ length: this.max + 1 }, function (v, k) {
                    if (k + 1 <= _this2.limit * 1 + 1) {
                        v = k + 1;
                    } else if (k + 1 === _this2.limit * 1 + 2) {
                        v = '...';
                    } else {
                        v = _this2.nowPages - (_this2.limit * 3 + 2 - (k - _this2.limit * 2 + 1));
                    }
                    return v;
                });
            } else {
                this.tempPages = Array.from({ length: this.max + 2 }, function (v, k) {
                    //两个省略号
                    if (k + 1 <= _this2.limit * 1 + 1) {
                        v = k + 1;
                    } else if (k + 1 === _this2.limit * 1 + 2) {
                        v = '...';
                    } else if (k + 1 > _this2.limit * 1 + 2 && k + 1 < _this2.limit * 3 + 4) {
                        v = _this2.nowPage - 2 + (k - _this2.limit * 2);
                    } else if (k + 1 === _this2.limit * 3 + 4) {
                        v = '...';
                    } else {
                        v = _this2.nowPages - (_this2.limit * 3 + 3 - (k - _this2.limit * 2 + 1));
                    }
                    return v;
                });
            }
        }
    }
});