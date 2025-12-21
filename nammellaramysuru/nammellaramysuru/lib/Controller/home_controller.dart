import 'dart:convert';

import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'package:nammellaramysuru/Services/database.dart';
import 'package:nammellaramysuru/Model/community_model.dart';
import 'package:nammellaramysuru/Model/event_model.dart';

class HomeController extends GetxController {
  static HomeController instance = Get.find();
  final layout = 'desktop'.obs; // default, will be overwritten
  List<Event> get events => EventProvider.events;
  var isEvent = true.obs;
  var isCommunity = false.obs;

  final communities = <Community>[].obs;
  final eventList = <Community>[].obs; // observable list
  final isLoading = true.obs;

  @override
  void onInit() {
    super.onInit();
    loadEvents();
  }

  Future<void> loadCommunities() async {
    try {
      isLoading.value = true;
      final data = await Database.fetchCommunities();
      for (var c in data) {
        print("${c.description} | ${c.name} | ${c.category}");
      }
      communities.assignAll(data);
    } catch (e) {
      Get.snackbar('Error', e.toString());
    } finally {
      isLoading.value = false;
    }
  }

  Future<void> loadEvents() async {
    try {
      isLoading.value = true;
      final data = await Database.fetchEvents();
      for (var c in data) {
        print("${c.description} | ${c.name} | ${c.category}");
      }
      eventList.assignAll(data);
    } catch (e) {
      Get.snackbar('Error', e.toString());
    } finally {
      isLoading.value = false;
    }
  }

  Future<void> loadCommunities2() async {
    try {
      isLoading.value = true;

      /* ----------  fetch raw string  ---------- */
      final resp = await http.get(
        Uri.parse(
          'https://admin.api.nammellaramysuru.in/api/v1/community?sortBy=created_at&order=desc&limit=10&offset=0&paged=true',
        ),
      );
      final raw = resp.body;

      /* ----------  print it  ---------- */
      print('✅  RAW JSON  ✅');
      print(raw);

      /* ----------  parse & assign  ---------- */
      final decoded = jsonDecode(raw) as Map<String, dynamic>;
      final rows = decoded['rows'] as List;
      communities.assignAll(rows.map((e) => Community.fromJson(e)).toList());
    } catch (e) {
      Get.snackbar('Error', e.toString());
      print(e);
    } finally {
      isLoading.value = false;
    }
  }
}
