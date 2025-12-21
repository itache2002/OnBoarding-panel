import 'package:get/get.dart';
import 'package:nammellaramysuru/Routes/home_binding.dart';
import 'package:nammellaramysuru/Views/community_view.dart';
import 'package:nammellaramysuru/Views/event_detail_view.dart';
import 'package:nammellaramysuru/Views/home_view.dart';

class AppPages {
  static const INITIAL = '/home';
  static final routes = [
    GetPage(
      name: '/home',
      page: () => const HomeView(),
      binding: HomeBinding(), // ← tell GetX to inject HomeController
    ),
    GetPage(name: '/community', page: () => const CommunityView()),
    GetPage(name: '/event', page: () => const EventDetailView()),
  ];
}
