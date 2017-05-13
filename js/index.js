let app = new Vue({
    el: '#app',
    data: {
        pages: 30,
        page: 8,
        options: [
            {
                name: "全部",
                icon: "fa fa-check-square-o",
                value: 1
            },
            [
                {
                    name: "关于我的",
                    icon: "fa fa-check-square-o",
                    value: 8
                },
                {
                    name: "我创建的",
                    icon: "fa fa-check-square-o",
                    value: 4
                },
                {
                    name: "我收藏的",
                    icon: "fa fa-check-square-o",
                    value: 5
                },
            ],
            [
                {
                    name: "其他条件",
                    icon: "fa fa-check-square-o",
                    value: 10
                },
                {
                    name: "其他条件2",
                    icon: "fa fa-check-square-o",
                    value: 7
                }
            ]
        ]
    },
    methods: {
        changePage (e) {
            console.log(e)
        }
    }
})
