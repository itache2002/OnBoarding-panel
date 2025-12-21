import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:nammellaramysuru/Controller/home_controller.dart';
import 'package:nammellaramysuru/responsive_layout.dart';
import 'package:nammellaramysuru/widgets/desktop_menu.dart';
import 'package:nammellaramysuru/widgets/drawer_menu.dart';
import 'package:nammellaramysuru/widgets/image_slider.dart';
import 'package:nammellaramysuru/widgets/logo_avatar.dart';
import 'package:nammellaramysuru/widgets/search_and_category_section.dart';
import 'package:nammellaramysuru/widgets/swarapana_wrap_view.dart';

class HomeView extends GetView<HomeController> {
  const HomeView({super.key});

  @override
  Widget build(BuildContext context) {
    final layout = ResponsiveLayout.getLayout(context);
    controller.layout.value = layout; // store for child widgets

    final pad = layout == 'mobile' ? 12.0 : 24.0;
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar:
          (layout == 'mobile' || layout == 'tablet')
              ? AppBar(
                backgroundColor: Colors.transparent,
                elevation: 0,
                leading: Builder(
                  builder:
                      (c) => IconButton(
                        icon: const Icon(Icons.menu, color: Color(0xFF0D4A53)),
                        onPressed: () => Scaffold.of(c).openDrawer(),
                      ),
                ),
              )
              : null,
      drawer:
          (layout == 'mobile' || layout == 'tablet')
              ? const DrawerMenu()
              : null,
      body: Container(
        decoration: const BoxDecoration(
          image: DecorationImage(
            image: AssetImage("assets/images/background.png"),
            fit: BoxFit.cover,
          ),
        ),
        child: SingleChildScrollView(
          padding: EdgeInsets.symmetric(horizontal: pad),
          child: Stack(
            alignment: Alignment.topCenter,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  const SizedBox(height: 30),
                  if (layout == 'desktop' || layout == 'laptop')
                    DesktopMenu(layout: layout),
                  const ImageSlider(),
                  const SizedBox(height: 20),
                  SearchAndCategorySection(layout: layout),
                  const SizedBox(height: 30),
                  SwarapanaWrapView(layout: layout),
                  const SizedBox(height: 40),
                ],
              ),
              const LogoAvatar(),
            ],
          ),
        ),
      ),
    );
  }
}
