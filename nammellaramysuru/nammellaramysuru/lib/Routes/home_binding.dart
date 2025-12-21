import 'package:get/get.dart';
import 'package:nammellaramysuru/Controller/home_controller.dart';

class HomeBinding implements Bindings {
  @override
  void dependencies() {
    // Get.lazyPut<HomeController>(() => HomeController());
    Get.put<HomeController>(HomeController(), permanent: true);
  }
}
