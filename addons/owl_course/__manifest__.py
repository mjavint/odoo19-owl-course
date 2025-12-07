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
