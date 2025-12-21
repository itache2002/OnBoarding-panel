import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:nammellaramysuru/Routes/app_pages.dart';
import 'package:nammellaramysuru/Themes/app_theme.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Music Event',
      theme: AppTheme.light,
      initialRoute: AppPages.INITIAL,
      getPages: AppPages.routes,
    );
  }
}
