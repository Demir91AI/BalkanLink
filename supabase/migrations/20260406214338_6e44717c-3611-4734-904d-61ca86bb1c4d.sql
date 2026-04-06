
-- Delete all data for both users from public tables
DELETE FROM public.chat_usage WHERE user_id IN ('ff8d5ad9-30b3-4030-8c65-be4f1226cff5', '85069d28-c046-4472-8c1f-7aef697892b3');
DELETE FROM public.user_form_access WHERE user_id IN ('ff8d5ad9-30b3-4030-8c65-be4f1226cff5', '85069d28-c046-4472-8c1f-7aef697892b3');
DELETE FROM public.mreza_payments WHERE user_id IN ('ff8d5ad9-30b3-4030-8c65-be4f1226cff5', '85069d28-c046-4472-8c1f-7aef697892b3');
DELETE FROM public.payments WHERE user_id IN ('ff8d5ad9-30b3-4030-8c65-be4f1226cff5', '85069d28-c046-4472-8c1f-7aef697892b3');
DELETE FROM public.messages WHERE sender_id IN ('ff8d5ad9-30b3-4030-8c65-be4f1226cff5', '85069d28-c046-4472-8c1f-7aef697892b3');
DELETE FROM public.ads WHERE user_id IN ('ff8d5ad9-30b3-4030-8c65-be4f1226cff5', '85069d28-c046-4472-8c1f-7aef697892b3');
DELETE FROM public.directory_listings WHERE user_id IN ('ff8d5ad9-30b3-4030-8c65-be4f1226cff5', '85069d28-c046-4472-8c1f-7aef697892b3');
DELETE FROM public.pro_services WHERE user_id IN ('ff8d5ad9-30b3-4030-8c65-be4f1226cff5', '85069d28-c046-4472-8c1f-7aef697892b3');
DELETE FROM public.balkan_rides WHERE user_id IN ('ff8d5ad9-30b3-4030-8c65-be4f1226cff5', '85069d28-c046-4472-8c1f-7aef697892b3');
DELETE FROM public.rides WHERE user_id IN ('ff8d5ad9-30b3-4030-8c65-be4f1226cff5', '85069d28-c046-4472-8c1f-7aef697892b3');
DELETE FROM public.reviews WHERE user_id IN ('ff8d5ad9-30b3-4030-8c65-be4f1226cff5', '85069d28-c046-4472-8c1f-7aef697892b3');
DELETE FROM public.user_roles WHERE user_id IN ('ff8d5ad9-30b3-4030-8c65-be4f1226cff5', '85069d28-c046-4472-8c1f-7aef697892b3');
DELETE FROM public.profiles WHERE id IN ('ff8d5ad9-30b3-4030-8c65-be4f1226cff5', '85069d28-c046-4472-8c1f-7aef697892b3');

-- Delete from auth.users (cascades remaining references)
DELETE FROM auth.users WHERE id IN ('ff8d5ad9-30b3-4030-8c65-be4f1226cff5', '85069d28-c046-4472-8c1f-7aef697892b3');
