{
    "name": "Owl Course",
    "version": "1.0.0",
    "summary": """ Owl Course Summary """,
    "author": "mjavint@gmail.com",
    "website": "https://www.youtube.com/@odoobrain",
    "category": "Tutorials",
    "depends": ["base", "web"],
    "data": [
        "views/menus.xml",
        "views/hello_world_actions.xml",
        "views/user_actions.xml",
        "views/counter_actions.xml",
        "views/reloj_actions.xml",
        "views/todo_actions.xml",
    ],
    "assets": {
        "web.assets_backend": [
            "owl_course/static/src/**/*",
        ],
    },
    "application": True,
    "installable": True,
    "auto_install": False,
    "license": "LGPL-3",
}
