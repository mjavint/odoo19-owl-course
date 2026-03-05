{
    "name": "Kpi_dashboard",
    "version": "1.0.0",
    "summary": """ Kpi_dashboard Summary """,
    "author": "mjavint@gmail.com",
    "website": "https://www.youtube.com/@odoobrain",
    "category": "Tutorials",
    "depends": ["base", "web"],
    "data": ["views/kpi_dashboard_views.xml"],
    "assets": {
        "web.assets_backend": ["kpi_dashboard/static/src/**/*"],
    },
    "application": True,
    "installable": True,
    "auto_install": False,
    "license": "LGPL-3",
}
